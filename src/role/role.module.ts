import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { RolesGuard } from './roles.guard';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [AuthModule],
  providers: [RolesGuard],
  exports: [RolesGuard],
})
export class RolesModule {}
