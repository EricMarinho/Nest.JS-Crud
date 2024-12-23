import { StateEntity } from "../../state/entities/state.entity";
import { UserEntity } from "../../user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("Cities")
export class CityEntity {
        @PrimaryGeneratedColumn("uuid")
        id: string;
    
        @CreateDateColumn()
        created_at: Date;
        
        @UpdateDateColumn()
        updated_at: Date;

        @Column()
        name: string;

        @Column({nullable: true})
        state_id: string;
        
        @ManyToOne(() => StateEntity, state => state.cities)
        state: StateEntity;

        @OneToMany(() => UserEntity, user => user.city)
        users: UserEntity[];
}