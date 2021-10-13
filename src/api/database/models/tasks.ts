import {
  Association,
  DataTypes,
  HasOneCreateAssociationMixin,
  HasOneGetAssociationMixin,
  HasOneSetAssociationMixin,
  Optional
} from "sequelize";
import { BaseTask } from "../../../models/task";
import UserModel from "./users";
import {
  AllowNull,
  BelongsTo,
  Column,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table
} from "sequelize-typescript";

interface TaskAttributes extends BaseTask {
  userId: string;
}

interface TaskCreationAttributes
  extends Optional<TaskAttributes, "id" | "priority" | "completed"> {}

@Table({ tableName: "tasks" })
export default class TaskModel
  extends Model<TaskAttributes, TaskCreationAttributes>
  implements TaskAttributes
{
  @PrimaryKey
  @Default(DataTypes.UUIDV4)
  @Column(DataTypes.UUID)
  id!: string;

  @ForeignKey(() => UserModel)
  @AllowNull(false)
  @Column({
    type: DataTypes.UUID,
    references: { model: UserModel, key: "id" },
    onDelete: "CASCADE"
  })
  userId!: string;

  @AllowNull(false)
  @Column(DataTypes.STRING(256))
  name!: string;

  @Column(DataTypes.STRING(512))
  description!: string | null;

  @Default(4)
  @Column(DataTypes.INTEGER)
  priority!: number;

  @Default(false)
  @Column(DataTypes.BOOLEAN)
  completed!: boolean;

  @Column(DataTypes.DATE)
  dueAt!: Date | null;

  readonly createdAt!: Date;
  readonly updatedAt!: Date;

  @BelongsTo(() => UserModel)
  readonly user?: UserModel;
  static associations: {
    user: Association<TaskModel, UserModel>;
  };

  getUser!: HasOneGetAssociationMixin<TaskModel>;
  setUser!: HasOneSetAssociationMixin<TaskModel, string>;
  createUser!: HasOneCreateAssociationMixin<TaskModel>;

  details() {
    const data = {
      id: this.id,
      name: this.name,
      priority: this.priority,
      completed: this.completed,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
    if (this.description) {
      data["description"] = this.description;
    }
    if (this.dueAt) {
      data["dueAt"] = this.dueAt;
    }
    return data;
  }
}
