import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly repo: Repository<Student>,
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<Student | null> {
    return await this.repo.save(createStudentDto);
  }

  findAll(): Promise<Student[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<Student | null> {
    const data: Student | null = await this.repo.findOne({where: {id}});
    if (data == null) {
      throw new NotFoundException(`Student with id ${id} not found`) 
    }
    return data ;
  }

  async update(id: number, updateStudentDto: UpdateStudentDto): Promise<Student> {
    const data = await this.repo.findOne({
      where: {id}
    });
    if (!data) {
      throw new NotFoundException(`Student with id ${id} not found`) 
    }
    Object.assign(data, updateStudentDto);
    return this.repo.save(data);
  }

  async remove(id: number): Promise<void>{
    const result = await this.repo.softDelete(id);

    if (result.affected == 0) {
      throw new NotFoundException(`Student with id ${id} not found`) 
    }
  }
}
