import { User } from "src/users/entities/user.entity"
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Table } from "typeorm"

@Entity({ name: 'auth' })
export class Auth {
    @PrimaryGeneratedColumn()
    id: number
    @ManyToOne(() => User, (user) => user.auth)
    @JoinColumn({ name: 'user_id' })
    user: User
    @Column({ name: 'refresh_token' })
    refresh_token: string
    @Column({ name: 'status' })
    status: "active" | "revoked" | "expired"
    @Column({ name: 'created_at' })
    createdAt: Date
    @Column({ name: 'expired_at' })
    expiredAt: Date
}
