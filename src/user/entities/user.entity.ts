import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'username', nullable:false, unique:true})
    username: string;

    @Column({name: 'password', nullable:false, unique:false})
    password: string;

    @Column({name: 'nick_name', nullable:true, unique:false})
    nickName: string;

    @DeleteDateColumn({type: 'timestamp', nullable:true})
    deletedAt: Date;
}
