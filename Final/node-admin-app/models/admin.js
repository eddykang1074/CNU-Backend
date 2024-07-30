module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
      "admin",
      {
        admin_member_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
          comment: "관리자웹사이트 관리자계정 고유번호",
        },
        company_code: {
          type: DataTypes.INTEGER,
          allowNull: false,
          comment: "소속회사코드-기준정보테이블참조,0-자회사,1-협력업체",
        },
        admin_id: {
          type: DataTypes.STRING(100),
          allowNull: false,
          comment: "관리자계정아이디-메일주소아님,eddy",
        },
        admin_password: {
          type: DataTypes.STRING(200),
          allowNull: false,
          comment: "관리자계정 난독화된 단방향 암호화된 텍스트값",
        },
        admin_name: {
          type: DataTypes.STRING(200),
          allowNull: false,
          comment: "관리자명",
        },
        email: {
          type: DataTypes.STRING(100),
          allowNull: true,
          comment: "메일주소",
        },
        telephone: {
          type: DataTypes.STRING(50),
          allowNull: true,
          comment: "전화번호",
        },
        dept_name: {
          type: DataTypes.STRING(100),
          allowNull: true,
          comment: "부서명",
        },
        used_yn_code: {
          type: DataTypes.TINYINT,
          allowNull: false,
          comment: "사용여부코드 1-사용중 0:사용불가",
        },
        reg_date: {
          type: DataTypes.DATE,
          allowNull: false,
          comment: "등록일시",
        },
        reg_member_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          comment: "등록자고유번호",
        },
        edit_date: {
          type: DataTypes.DATE,
          allowNull: true,
          comment: "등록일시",
        },
        edit_member_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
          comment: "수정자고유번호",
        },
      },
      {
        sequelize,
        tableName: "admin", //기본 테이블명 옵션이 복수형이 아닌 여기 지정한 테이블명으로 생성됨
        timestamps: false,
        comment: "관리자사이트 관리자 계정정보",
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "admin_member_id" }], //여러개의 컬럼이 프라이머리키인경우(복합키){}추가하여 설정가능
          },
        ],
      }
    );
  };