 // //oracle client 실행
  // try {
  //   oracledb.initOracleClient({ libDir: './instantclient_21_12' });
  // } catch (err) {
  //   console.error('undefined oracle client');
  //   console.error(err);
  //   process.exit(1);
  // }

  // //oracle 접속
  // let connection = await oracledb.getConnection(devOraDB);
  // let binds = {};
  // let options = {
  //   outFormat: oracledb.OUT_FORMAT_OBJECT, // query result format
  // };

  // //query 실행
  // let result = await connection.execute('select * from tab', binds, options);

  // //접속 종료
  // await connection.close();
  
  // console.log(result);