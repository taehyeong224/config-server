import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Test {
    @PrimaryGeneratedColumn()
    idx: number;

    @Column({ type: "varchar" })
    name: string;
}