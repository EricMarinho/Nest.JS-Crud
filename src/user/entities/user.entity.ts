import { CityEntity } from "@src/city/entities/city.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("Users")
export class UserEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @CreateDateColumn()
    created_at: Date;
    
    @UpdateDateColumn()
    updated_at: Date;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({enum: ["admin", "user"], default: "user"})
    role: string;

    @Column({nullable: true})
    city_id: string;

    @ManyToOne(() => CityEntity, city => city.users)
    city: CityEntity;
}