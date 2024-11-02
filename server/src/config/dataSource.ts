import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

const options: DataSourceOptions & SeederOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'Madi',
  password: 'madi123',
  database: 'music_app',
  synchronize: true,
  logging: true,
  entities: ['src/entities/*{.js,.ts}'],
  seeds: ['src/database/seeders/*{.js,.ts}'],
  factories: ['src/database/factories/*{.js,.ts}']
};

export const appDataSource = new DataSource(options);