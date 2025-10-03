import { MigrationInterface, QueryRunner } from 'typeorm';
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import { fileURLToPath } from 'url';

interface CustomerRecord {
  customer_id: string;
  name: string;
}

export class SeedCustomers1759313397438 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "customer";`);

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const filePath = path.join(__dirname, 'customers.csv');
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
      bom: true,
    }) as CustomerRecord[];

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('customer', ['referanceId', 'name'])
      .values(
        records.map((r) => ({
          referanceId: r.customer_id.toString(),
          name: r.name ?? null,
        })),
      )
      .orIgnore()
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "customer";`);
  }
}
