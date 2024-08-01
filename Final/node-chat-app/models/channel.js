module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
      "channel",
      {
        channel_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
          comment: "채널고유번호",
        },
        community_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          comment: "소속 커뮤니티 고유번호",
        },
        category_code: {
          type: DataTypes.TINYINT,
          allowNull: false,
          comment: "채널분류코드 1:일대일채팅채널, 2:그룹채팅채널",
        },
        channel_name: {
          type: DataTypes.STRING(100),
          allowNull: false,
          comment: "채널명",
        },
        channel_img_path: {
          type: DataTypes.STRING(300),
          allowNull: true,
          comment: "채널 대표 이미지 경로",
        },
        user_limit: {
          type: DataTypes.INTEGER,
          allowNull: false,
          comment: "최대 접속자 제한수",
        },
  
        channel_desc: {
          type: DataTypes.STRING(100),
          allowNull: true,
          comment: "채널설명",
        },
        channel_state_code: {
          type: DataTypes.TINYINT,
          allowNull: false,
          comment: "채널상태코드 0:사용안함 1:사용중",
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
        tableName: "channel",
        timestamps: false,
        comment: "채팅채널정보",
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "channel_id" }],
          },
        ],
      }
    );
  };