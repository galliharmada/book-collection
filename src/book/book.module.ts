import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { RolesGuard } from 'src/role/roles.guard';
import { RolesModule } from 'src/role/role.module';

@Module({
  imports: [RolesModule],
  controllers: [BookController],
  providers: [BookService],
  exports: [BookService],
})
export class BookModule {}
