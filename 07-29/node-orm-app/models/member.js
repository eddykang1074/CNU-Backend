module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
      "member",
      {
        member_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
          comment: "회원고유번호",
        },
        email: {
          type: DataTypes.STRING(100),
          allowNull: false,
          comment: "사용자메일주소",
        },
        member_password: {
          type: DataTypes.STRING(200),
          allowNull: false,
          comment: "사용자 난독화된 해시암호문자열",
        },
        name: {
          type: DataTypes.STRING(100),
          allowNull: false,
          comment: "회원명",
        },
        profile_img_path: {
          type: DataTypes.STRING(300),
          allowNull: true,
          comment: "회원프로파일 이미지경로",
        },
        telephone: {
          type: DataTypes.STRING(200),
          allowNull: true,
          comment: "전화번호-AES 양방향암호화 적용",
        },
        entry_type_code: {
          type: DataTypes.TINYINT,
          allowNull: false,
          comment: "가입유형코드 0:직접가입 1:페이스북SNS",
        },
        use_state_code: {
          type: DataTypes.TINYINT,
          allowNull: false,
          comment: "이용상태 0:허용대기 1:사용중 2:탈퇴처리",
        },
        birth_date: {
          type: DataTypes.STRING(200),
          allowNull: true,
          comment: "생년월일-AES 양방향암호화 적용",
        },
        entry_date: {
          type: DataTypes.DATE,
          allowNull: false,
          comment: "등록일시",
        },
        edit_date: {
          type: DataTypes.DATE,
          allowNull: true,
          comment: "수정일시",
        },
        edit_member_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
          comment: "수정자고유번호",
        },
      },
      {
        sequelize,
        tableName: "member",
        timestamps: false,
        comment: "회원정보",
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "member_id" }],
          },
        ],
      }
    );
  };