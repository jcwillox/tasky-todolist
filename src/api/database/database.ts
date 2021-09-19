import { Sequelize } from "sequelize";
import User from "./models/users";
import { SyncOptions } from "sequelize/types/lib/sequelize";

let sequelize: Sequelize | null;

const connect = async () => {
  const url = process.env.DATABASE_URL || "sqlite::memory:";

  sequelize = new Sequelize(url, { logging: false });

  User.define(sequelize);

  await sequelize.authenticate();
  await sequelize.sync();
};

const disconnect = async () => {
  await sequelize?.close();
};

const sync = async (options?: SyncOptions) => {
  await sequelize?.sync(options);
};

const database = {
  connect,
  disconnect,
  sync
};

export default database;
