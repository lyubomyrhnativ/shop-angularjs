let transport={
host: 'smtp.gmail.com',
tls: { rejectUnauthorized: false },
port: 465,
secure: true, // true for 465, false for other ports
auth:  {
        user: 'securesally@gmail.com', // generated ethereal user
        pass: 'sdetnkkkeyvmxwvk' // generated ethereal password
    }
}
module.exports=transport;
