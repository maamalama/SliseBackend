import { Controller, Get, Param, Query, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Token } from '@prisma/client';
import { SentryInterceptor } from '../interceptors/sentry.interceptor';
import { TransformInterceptor } from '../interceptors/transform.interceptor';
import { AnalyticsService } from './analytics.service';
import { HolderInfoRequest } from './requests/holder-info-request';
import { BlockChainUserEvent } from './models/blockchain-events';

@ApiTags('Slice')
@UseInterceptors(SentryInterceptor)
@Controller({ path: 'api/analytics' })
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {
  }

 @Get('getTokens')
  @UseInterceptors(TransformInterceptor)
  async getTokens(): Promise<Token[]> {
      const result = await this.analyticsService.getTokens();
      return result;
  }

  @Get('tokenEventsByContracts/:token')
  @UseInterceptors(TransformInterceptor)
  async getHoldersByContracts(
    @Param('token') token: string,
    @Query('network') network: number,
    @Query('pageSize') pageSize: number): Promise<BlockChainUserEvent[]> {
    return await this.analyticsService.tokenEventsByContract(network, token, pageSize);
  }
  /*
   @Get('token/:token')
   @UseInterceptors(TransformInterceptor)
   async getHolders(
       @Param('token') token: string,
       @Query('network') network: number,
       @Query('pageSize') pageSize: number): Promise<TokenHolder[]> {
       return await this.analyticsService.tokenHolders(network, token, pageSize);
   }

   @Get('tokenHolders/:token')
   @UseInterceptors(TransformInterceptor)
   async getTimelineHolders(
       @Param('token') token: string,
       @Query('network') network: number,
       @Query('pageSize') pageSize: number,
       @Query('startDate') startDate: string,
       @Query('endDate') endDate: string,
       @Query('period') period: string): Promise<TimestampEvent[]> {
       return await this.analyticsService.tokenHoldersBetweenDates(network, token, pageSize, startDate, endDate, period);
   }

   @Get('tokenFromSource/:token')
   @UseInterceptors(TransformInterceptor)
   async getHoldersFromSource(
       @Param('token') token: string,
       @Query('network') network: number,
       @Query('pageSize') pageSize: number): Promise<TokenHolder[]> {
       return await this.analyticsService.tokenHoldersFromSource(network, token, pageSize);
   }

   @Get('eventsByAddress/:contractAddress')
   @UseInterceptors(TransformInterceptor)
   async getEventsByAddress(
       @Param('contractAddress') contractAddress: string,
       @Query('startDate') startDate: string,
       @Query('endDate') endDate: string,
       @Query('pageSize') pageSize: number,
       @Query('page') page: number): Promise<any> {
       return await this.analyticsService.eventsByAddress(contractAddress, startDate, endDate, pageSize, page);
   }

   @Get('eventsByContractsAndAddreses')
   @UseInterceptors(TransformInterceptor)
   async getEventsByContractsAndAddress(
       @Query(new ValidationPipe({ transform: true })) request: BlockChainEventRequest): Promise<BlockChainUserEvent[]> {
       const response = await this.analyticsService.eventsByContractsAndAddresses(request.contractsAddresses, request.addresses);

       return response;
   }*/

  @Get('parseHolders')
  @UseInterceptors(TransformInterceptor)
  async parseHolders(
    @Query(new ValidationPipe(/*{ transform: true }*/)) request: HolderInfoRequest): Promise<string> {
    await this.analyticsService.parseHolders(request);
    return 'success';
  }
}
