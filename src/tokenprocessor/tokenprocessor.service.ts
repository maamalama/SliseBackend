import { Logger, Scope } from '@nestjs/common';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { HolderInfoRequest } from '../analytics/requests/holder-info-request';
import { AnalyticsService } from '../analytics/analytics.service';
import { PrismaService } from '../prisma/prisma.service';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import Redlock from 'redlock';

@Processor({ name: 'waitlist', scope: Scope.DEFAULT })
export class TokenProcessorService {
  private readonly redlock;

  constructor(
    @InjectRedis() private readonly redis: Redis,
    private readonly analyticsService: AnalyticsService,
    private readonly prisma: PrismaService
  ) {
    this.redlock = new Redlock([redis]);
  }

  private readonly logger = new Logger(TokenProcessorService.name);
  //TODO: Move to one loop: fetching -> parsing -> storing
  //TODO: fix try/catch
  @Process({ name: 'parseAndStore', concurrency: 1 })
  async parseAndStore(job: Job) {
    this.logger.debug(`received job with id: ${job.id}`);

    this.logger.debug(`parsing job with id: ${job.id}`);
    const holders: HolderInfoRequest = job.data.holdersRequest;

    async function timeout(interval) {
      return new Promise(resolve => {
        setTimeout(resolve, interval);
      });
    }

    await this.prisma.waitlist.findFirst({
      where: {
        name: holders.collectionName
      }
    });
    const waitlist = await this.prisma.waitlist.create({
      data: {
        name: holders.collectionName,
        contractAddress: holders.contractAddress,
        symbol: holders.symbol
      }
    });
    try {
      let savedHolders: any[] = [];
      holders.addresses.map((tokenHolder) => {
        const dataHolder = {
          address: tokenHolder,
          totalBalanceTokens: 0,
          totalBalanceUsd: 0,
          ethBalance: 0,
          firstTransactionDate: new Date(),
          volume: 0
        };
        savedHolders.push(dataHolder);
        this.logger.debug(`holder ${tokenHolder} parsed`);
      });
      await this.prisma.tokenHolder.createMany({
        data: savedHolders
      });
      this.logger.debug(`saved ${savedHolders.length} holders`);
    } catch (e) {
      const error = e.toString();
      this.logger.debug(
        `Error processing job with id: ${job.id} error: ${JSON.stringify({ error })}`
      );
    } finally {

    }
    this.logger.debug(`job with id: ${job.id} done successful`);
  }
}