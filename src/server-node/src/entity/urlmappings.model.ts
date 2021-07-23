import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

@Entity()
export class URLMappings {
    constructor(url: string, shortened: string) {
        this.url = url;
        this.shortened = shortened;
    }

    @PrimaryGeneratedColumn()
    id!: number;

    @Index({ unique: true })
    @Column({ nullable: false })
    url!: string;

    @Index({ unique: true })
    @Column({ nullable: false })
    shortened!: string;

    @UpdateDateColumn({
        nullable: false,
        type: 'datetime',
        default: () => 'CURRENT_TIMESTAMP',
    })
    updated_on!: Date;

    @CreateDateColumn({
        nullable: false,
        type: 'datetime',
        default: () => 'CURRENT_TIMESTAMP',
    })
    created_on!: Date;
}
