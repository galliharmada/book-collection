import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

@Injectable()
export class BookService {
  private books: Book[] = [];
  private id = 1;

  create(createBookDto: CreateBookDto): Book {
    const save = new Book({
      id: this.id++,
      ...createBookDto,
    });
    this.books.push(save);
    return save;
  }

  findAll(): Book[] {
    return this.books;
  }

  findOne(id: number): Book {
    const book = this.books.find((book) => book.id === id);
    if (!book) throw new BadRequestException(`Book With ID ${id} Not Found`);

    return book;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    const index = this.books.findIndex((book) => book.id === id);

    if (index === -1) throw new NotFoundException();
    const updateBook = { ...this.books[index], ...updateBookDto };

    this.books[index] = updateBook;
    return updateBook;
  }

  remove(id: number) {
    const index = this.books.findIndex((book) => book.id);
    if (index === -1) throw new NotFoundException();

    this.books.splice(index, 1);
  }
}
