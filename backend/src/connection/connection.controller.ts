import { Body, Controller, Get, Post } from '@nestjs/common';
import { ConnectionService } from './connection.service';
import { Connection } from './schemas/connection.schema';
@Controller('connection')
export class ConnectionController {
    constructor(
        private connectionService: ConnectionService
    ) { }

    @Get()
    async findAllConnections(): Promise<Connection[]> {
        return this.connectionService.findAll();
    }

    @Get('/formatted')
    async findAllConnectionsFormated(): Promise<Connection[]> {
        const connections = await this.connectionService.findAll();
        
        return this.connectionService.formatConnectionData(connections) as Connection[];
    }

    @Post('/create')
    async createConnection(
        @Body()
        connection: Connection
    ): Promise<Connection> {
        return this.connectionService.create(connection);
    }

    @Get('/create-fixtures')
    async createFixtures(): Promise<void> {
        const connections = [
            {
                date: '29-04-2023',
                mail: 'test@test.com',
                success: true
            },
            {
                date: '22-06-2023',
                mail: 'test.test@test.com',
                success: false
            },
            {
                date: '23-06-2023',
                mail: 'test.test@test.com',
                success: false
            },
            {
                date: '24-06-2023',
                mail: 'test.test@test.com',
                success: false
            },
        ];
        connections.forEach(async (connection) => {
            await this.connectionService.create(connection);
        }); 
    }

    @Post('/delete')
    async deleteConnection(
        @Body()
        id: string
    ): Promise<Connection> {
        return this.connectionService.delete(id);
    }

    @Post('/find')
    async findConnection(
        @Body()
        id: string
    ): Promise<Connection> {
        return this.connectionService.findOne(id);
    }

    @Get('/delete-all')
    async deleteAllConnections(): Promise<void> {
        await this.connectionService.deleteAll();
    }
}
