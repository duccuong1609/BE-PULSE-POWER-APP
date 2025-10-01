import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedProducts1759313397437 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "product";`);

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('product')
      .values([
        { referanceId: 'SP000001', name: 'Thủ mì 2, 1ky' },
        { referanceId: 'SP000002', name: 'Thủ mì 2, 500gr' },
        { referanceId: 'SP000003', name: 'Thủ ngon 200gr' },
        { referanceId: 'SP000004', name: 'Thủ ngon 500gr' },
        { referanceId: 'SP000005', name: 'Ớt xiêm (ống)' },
        { referanceId: 'SP000007', name: 'Bò Mì 2, 1ky' },
        { referanceId: 'SP000010', name: 'Bò Đen' },
        { referanceId: 'SP000012', name: 'Thủ ( T )' },
        { referanceId: 'SP000013', name: 'Xúc Xích 1ky' },
        { referanceId: 'SP000015', name: 'Lụa Ống 2, 1kg' },
        { referanceId: 'SP000016', name: 'Lụa Dây Vàng, 500GR' },
        { referanceId: 'SP000017', name: 'Dabao Đỏ 1, 1ky' },
        { referanceId: 'SP000018', name: 'Dabao đỏ 2, 500GR' },
        { referanceId: 'SP000019', name: 'Dabao trắng loại 1 .1ky' },
        { referanceId: 'SP000020', name: 'Pate 1' },
        { referanceId: 'SP000021', name: 'Pate 2' },
        { referanceId: 'SP000022', name: 'Chả Chiên Vuông' },
        { referanceId: 'SP000025', name: 'Giò Xào 500g' },
        { referanceId: 'SP000026', name: 'Giò Xào 200g' },
        { referanceId: 'SP000027', name: 'Lụa Bì Ớt Xiêm GÓI' },
        { referanceId: 'SP000028', name: 'Bò Gân Ớt Xiêm GÓI' },
        { referanceId: 'SP000029', name: 'Nem Nướng' },
        { referanceId: 'SP000030', name: 'Chà Bông 1' },
        { referanceId: 'SP000031', name: 'Chà Bông 2' },
        { referanceId: 'SP000032', name: 'Chà Bông 3' },
        { referanceId: 'SP000033', name: 'Bơ Ngon' },
        { referanceId: 'SP000034', name: 'Bơ' },
        { referanceId: 'SP000035', name: 'Nem Chua 2 ( Bịch Xanh )' },
        { referanceId: 'SP000036', name: 'Nem Chua 1 ( bịch vàng )' },
        { referanceId: 'SP000037', name: 'Chả Quế 500g' },
        { referanceId: 'SP000038', name: 'Quế 200g' },
        { referanceId: 'SP000039', name: 'Thủ Ống Lớn' },
        { referanceId: 'SP000040', name: 'Thủ ống Lớn ( Nấm Mèo )' },
        { referanceId: 'SP000041', name: 'Chả Bách Thảo ( Dây Tím )' },
        { referanceId: 'SP000042', name: 'Chả Bách Hoa ( xanh dương )' },
        { referanceId: 'SP000043', name: 'Máy Cắt Chả' },
        { referanceId: 'SP000044', name: 'Xúc Xích Căt' },
        { referanceId: 'SP000045', name: 'Bò Cắt' },
        { referanceId: 'SP000046', name: 'Lụa Căt' },
        { referanceId: 'SP000047', name: 'Thủ Căt' },
        { referanceId: 'SP000048', name: 'Thùng Xốp' },
        { referanceId: 'SP000051', name: 'Mọc Bò' },
        { referanceId: 'SP000052', name: 'Cước Xe' },
        { referanceId: 'SP000053', name: 'Pate 3' },
        { referanceId: 'SP000054', name: 'Dabao 2 cắt' },
        { referanceId: 'SP000055', name: 'LỤA NGON (DÂY ĐỎ)' },
        { referanceId: 'SP000057', name: 'BÒ MÌ 2, 500gr' },
        { referanceId: 'SP000058', name: 'XÚC XÍCH 500gr' },
        { referanceId: 'SP000059', name: 'LỤA ỐNG 2, 500gr' },
        { referanceId: 'SP000060', name: 'DABAO ĐỎ 1 [500G ]' },
        { referanceId: 'SP000061', name: 'Thủ Hà Nội' },
      ])
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('product')
      .where('referanceId IN (:...referanceIds)', {
        referanceIds: [
          'SP000001',
          'SP000002',
          'SP000003',
          'SP000004',
          'SP000005',
          'SP000007',
          'SP000010',
          'SP000012',
          'SP000013',
          'SP000015',
          'SP000016',
          'SP000017',
          'SP000018',
          'SP000019',
          'SP000020',
          'SP000021',
          'SP000022',
          'SP000025',
          'SP000026',
          'SP000027',
          'SP000028',
          'SP000029',
          'SP000030',
          'SP000031',
          'SP000032',
          'SP000033',
          'SP000034',
          'SP000035',
          'SP000036',
          'SP000037',
          'SP000038',
          'SP000039',
          'SP000040',
          'SP000041',
          'SP000042',
          'SP000043',
          'SP000044',
          'SP000045',
          'SP000046',
          'SP000047',
          'SP000048',
          'SP000051',
          'SP000052',
          'SP000053',
          'SP000054',
          'SP000055',
          'SP000057',
          'SP000058',
          'SP000059',
          'SP000060',
          'SP000061',
        ],
      })
      .execute();
  }
}
