const map = {
    'BTech': 'BT',
    'MTech': 'MT',
    'Diploma': 'DP',
    'Everyone': 'ALL',
    'First Year': 'FY',
    'Second Year': 'SY',
    'Third Year': 'TY',
    'Fourth Year': 'LY',
    'Computer Science': 'CS',
    "Information Technology": 'IT',
    'Civil Engineering': 'CE',
    'Mechanical Engineering': 'ME',
    'Electronics Engineering': 'ELT',
    'Electrical Engineering': 'EE',
    'Exam Cell': 'EX',
}

let noticeNumber = '0001';

const generateNoticeID = (program, branch, year1, total)=>{
    // console.log(program, branch, year1);
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    if(total+1 > Number(noticeNumber)){
        const noticeID = `${map[program]}${map[branch]}${map[year1]}${year}${month}${day}${noticeNumber}`;
        noticeNumber = (total+1).toString().padStart(4, '0');
        return noticeID;
    }
    else{
        const noticeID = `${map[program]}${map[branch]}${map[year1]}${year}${month}${day}${noticeNumber}`;
        noticeNumber = (parseInt(noticeNumber) + 1).toString().padStart(4, '0');
        return noticeID;
    }
    // console.log(noticeID);
}

module.exports = generateNoticeID;