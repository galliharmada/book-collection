import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { RolesGuard } from 'src/role/roles.guard';
import { Roles } from 'src/role/role.decorator';
import { Role } from 'src/role/roles.enum';
import { ResponseInterceptor } from 'src/general/interceptor/response.interceptor';

@UseInterceptors(ResponseInterceptor)
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post('/')
  @Roles(Role.ADMIN)
  create(@Body(ValidationPipe) createBookDto: CreateBookDto) {
    const data = this.bookService.create(createBookDto);
    return { data, message: '' };
  }

  @Get()
  @Roles(Role.ADMIN, Role.USER)
  findAll() {
    const data = this.bookService.findAll();
    return { data, message: '' };
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.USER)
  findOne(@Param('id') id: string) {
    const data = this.bookService.findOne(+id);
    return { data, message: '' };
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateBookDto: UpdateBookDto,
  ) {
    const data = this.bookService.update(+id, updateBookDto);
    return { data, message: '' };
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string) {
    const data = this.bookService.remove(+id);
    return { data, message: '' };
  }
}
