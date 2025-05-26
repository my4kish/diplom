// src/notifications/notifications.gateway.ts
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@WebSocketGateway({
  namespace: '/notifications',
  cors: { origin: '*' },
})
export class NotificationsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private readonly logger = new Logger(NotificationsGateway.name);
  constructor(private readonly jwtService: JwtService) {}

  afterInit(server: Server): void {
    void server;
    this.logger.log('NotificationsGateway initialized');
  }

  handleConnection(client: Socket) {
    const token = client.handshake.auth.token as string;
    this.logger.log(
      'Handshake auth payload:',
      JSON.stringify(client.handshake.auth),
    );

    if (!token) {
      this.logger.warn('No token provided, disconnecting');
      return client.disconnect(true);
    }

    let payload: any;
    try {
      payload = this.jwtService.verify(token);
      this.logger.log('JWT payload:', JSON.stringify(payload));
    } catch (err) {
      this.logger.warn(`Socket auth failed: ${err.message}`);
      return client.disconnect(true);
    }

    // берем sub (который PassportStrategy кладёт в payload.sub)
    const userId = payload.sub as string;
    if (!userId) {
      this.logger.warn('No sub in JWT payload, disconnecting');
      return client.disconnect(true);
    }

    client.join(userId);
    this.logger.log(`Client ${client.id} joined room ${userId}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  /** Метод, которым будем эмитить уведомления в нужную комнату */
  public sendNotification(userId: string, payload: any) {
    console.log('emit notif to room', userId, payload);
    this.server.to(userId).emit('notification', payload);
  }
}
