const oracledb = require('oracledb');
// oracledb.initOracleClient();
oracledb.initOracleClient({ libDir: './instantclient_21_12' });
// oracledb.initOracleClient({ libDir: 'C:/instantclient_21_12' });
// oracledb.initOracleClient({ libDir: 'C:/Oracle/21c/homes/OraDB21Home1' });

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

const mypw = "JupiterLabs#20221014##";  // set mypw to the hr schema password
const DevOraIP = "146.56.45.203";
const DevOraPort = "1521";
const DevOraSID = "JLDB";
const DevConnectString = `(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=146.56.45.203)(PORT=1521))(CONNECT_DATA=(SERVER=DEDICATED)(SID=JLDB)))`;

async function run() {

    const connection = await oracledb.getConnection ({
        
        user          : "ORBIT",
        password      : mypw,
        connectString : "146.56.45.203:1521/JLDB"
        // connectString : "(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=146.56.45.203)(PORT=1521))(CONNECT_DATA=(SERVER=DEDICATED)(SID=JLDB)))"
        // connectString : DevConnectString

    });

    const result = await connection.execute(
        `SELECT *
        FROM tab`
    );

    console.log(result.rows);
    await connection.close();
}

run();