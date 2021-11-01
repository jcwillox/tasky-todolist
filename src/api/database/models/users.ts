import {
  Association,
  DataTypes,
  HasManyAddAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
  Optional
} from "sequelize";
import { NewUser, User } from "../../../models/user";
import { SALT_ROUNDS } from "../../../config";
import bcrypt from "bcrypt";
import TaskModel from "./tasks";
import {
  AllowNull,
  BeforeCreate,
  BeforeUpdate,
  Column,
  Default,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  Unique
} from "sequelize-typescript";

interface UserAttributes extends User, NewUser {}
interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

@Table({ tableName: "users" })
export default class UserModel
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  @PrimaryKey
  @Default(DataTypes.UUIDV4)
  @Column(DataTypes.UUID)
  id!: string;

  @Unique
  @AllowNull(false)
  @Column(DataTypes.STRING(32))
  username!: string;

  @Column(DataTypes.STRING(128))
  name!: string | null;

  @Column(DataTypes.STRING(24))
  group!: string | null;

  @AllowNull(false)
  @Column(DataTypes.STRING(60))
  password!: string;

  readonly createdAt!: Date;
  readonly updatedAt!: Date;

  @HasMany(() => TaskModel)
  readonly tasks?: TaskModel[];
  static associations: {
    tasks: Association<UserModel, TaskModel>;
  };

  getTasks!: HasManyGetAssociationsMixin<TaskModel>;
  addTask!: HasManyAddAssociationMixin<TaskModel, number>;
  hasTask!: HasManyHasAssociationMixin<TaskModel, number>;
  countTasks!: HasManyCountAssociationsMixin;
  createTask!: HasManyCreateAssociationMixin<TaskModel>;

  @BeforeUpdate
  @BeforeCreate
  private static async hashPassword(user: UserModel) {
    if (user.changed("password"))
      user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  }

  validatePassword(password: string) {
    return bcrypt.compare(password, this.password);
  }

  details() {
    const data = {
      id: this.id,
      username: this.username
    };
    if (this.name) {
      data["name"] = this.name;
    }
    if (this.group) {
      data["group"] = this.group;
    }
    return data;
  }
}
