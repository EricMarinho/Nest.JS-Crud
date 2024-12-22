import { CityEntity } from "../../city/entities/city.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("States")
export class StateEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @CreateDateColumn()
    created_at: Date;
    
    @UpdateDateColumn()
    updated_at: Date;

    @Column()
    name: string;

    @Column()
    abbreviation: string;

    @Column({nullable: true})
    fun_fact: string;

    @ManyToOne(() => CityEntity, city => city.state)
    cities: CityEntity[];
}