import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('student_benz')
export class Student {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'first_name', nullable:true})
    firstName: string;

    @Column({name: 'last_name', nullable:true})
    lastName: string;

    @Column({name: 'faculty', nullable:true})
    faculty: string;

    @Column({name: 'gpa', type:'decimal', precision: 3, scale: 2 , nullable:true})
    gpa: number;

    @DeleteDateColumn({type: 'timestamp', nullable:true})
    deletedAt: Date;
}
