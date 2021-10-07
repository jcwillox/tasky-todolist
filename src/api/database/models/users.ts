import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { NewUser, User } from "../../../models/user";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

interface UserAttributes extends User, NewUser {}
interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

export default class UserModel
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: string;
  public name?: string | null;
  public group?: string | null;
  public username!: string;
  public password!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

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

  /** Attach sequelize instance to the model */
  static define(sequelize: Sequelize) {
    this.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true
        },
        username: {
          type: DataTypes.STRING(32),
          allowNull: false,
          unique: true
        },
        name: {
          type: DataTypes.STRING(128)
        },
        group: {
          type: DataTypes.STRING(24)
        },
        password: {
          type: DataTypes.STRING(60),
          allowNull: false
        }
      },
      {
        sequelize,
        tableName: "users",
        hooks: {
          beforeCreate: async user => {
            user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
          }
        }
      }
    );
  }
}
