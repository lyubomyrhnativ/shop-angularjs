let transport={
host: 'smtp.gmail.com',
tls: { rejectUnauthorized: false },
port: 465,
secure: true, // true for 465, false for other ports
auth:  {
        user: 'vitang.developer@gmail.com', // generated ethereal user
        pass: 'ilrrsyhkvwxkgjcw' // generated ethereal password
    }
}
module.exports=transport;
