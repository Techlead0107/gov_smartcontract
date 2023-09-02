let VESTING_SCHEDULE = [
    {
        percent:0.07, // PERCENT TOKENS
        name:"0: Angel",
        vesting: 300, // 10 months *30
        lock:21,
        nonLinear:false,
        wallets:[
            {
                amount:100000,
                address:''
            }

        ]
    },
    {
        percent:0.08,
        name:"1: Seed",
        lock:0,
        vesting: 270,
        nonLinear:true,
        scedule:[
            [0, 14], //14 Day cliff
            [19, 1], //10% at cliff end 
            [0, 45], //0 till Month 2 
            [11.25, 1], //month 2-8 11.25 %
            [0, 29], //0 till Month 3 
            [11.25, 1], //month 2-8 11.25 %            
            [0, 29], //0 till Month 4 
            [11.25, 1], //month 2-8 11.25 %
            [0, 29], //0 till Month 5 
            [11.25, 1], //month 2-8 11.25 %
            [0, 29], //0 till Month 6 
            [11.25, 1], //month 2-8 11.25 %
            [0, 29], //0 till Month 7 
            [11.25, 1], //month 2-8 11.25 %
            [0, 29], //0 till Month 8 
            [11.25, 1] //month 2-8 11.25 %
            [0, 29], //0 till Month 9
            [11.25, 1] //month 2-9 11.25 %
        ],
        wallets:[
            {
                amount:100000,
                address:''
            }

        ]
    },
    {
        percent:0.1,
        name:"2: Strategic",
        nonLinear:true,
        vesting: 210, //7 Months * 30
        lock:0,
        scedule:[
            [0, 7], //14 Day cliff
            [10, 1], //10% at cliff end 
            [0, 45], //0 till Month 2 
            [15, 1], //month 2-7 15%
            [0, 29], //0 till Month 3 
            [15, 1], //month 2-7 15%
            [0, 29], //0 till Month 4 
            [15, 1], //month 2-7 15%
            [0, 29], //0 till Month 5 
            [15, 1], //month 2-7 15%
            [0, 29], //0 till Month 6 
            [15, 1], //month 2-7 15%
            [0, 29], //0 till Month 7 
            [15, 1] //month 2-7 15%
        ],
        wallets:[
            {
                amount:100000,
                address:''
            }

        ]
    },
    {
        percent:0.1,
        name:"3: Private",
        vesting: 210, // 7 months * 30
        lock:0,
        nonLinear:true,
        scedule:[
            [5, 1], //5% at TGE
            [0, 3], //72h cliff
            [0, 29],//5%
            [15, 1], //15% for 2-7 months
            [0, 45], //0 till Month 2 
            [15, 1], //15% for 6 months
            [0, 29], //0 till Month 3 
            [15, 1], //15% for 6 months
            [0, 29], //0 till Month 4 
            [15, 1], //15% for 6 months
            [0, 29], //0 till Month 5 
            [15, 1], //15% for 6 months
            [0, 29], //0 till Month 6 
            [15, 1] //15% for 6 months
        ],
        wallets:[
            {
                amount:100000,
                address:''
            }

        ]
    },
    {
        percent:0.06,
        name:"4: Public",
        vesting: 150, // 7 months * 30
        lock:0,
        nonLinear:true,
        scedule:[
            [10, 1], //10% at TGE
            [0, 29], //1 month after TGE
            [20, 1],//20% for 4 months
            [0, 29], //2 month after TGE
            [20, 1],//20% for 4 months
            [0, 29], //3 month after TGE
            [20, 1],//20% for 4 months
            [0, 29], //4 month after TGE
            [20, 1],//20% for 4 months
            [0, 29], //5 month after TGE
            [10, 1]//10% on month 5
        ],
        wallets:[
            {
                amount:100000,
                address:''
            }

        ]
    },
    {
        percent:0.07,
        name:"5: Team",
        vesting: 540,
        nonLinear:false,
        lock: 180,
        wallets:[
            {
                amount:100000,
                address:''
            }
        ]
    },
    {
        percent:0.0225,
        name:"6: Early Advisor",
        vesting: 360,
        nonLinear:false,
        lock: 28,
        wallets:[
            {
                amount:100000,
                address:''
            }

        ]
    },
    {
        percent:0.0225,
        name:"7: Future Advisor",
        vesting: 360,
        nonLinear:false,
        lock: 28,
        wallets:[
            {
                amount:100000,
                address:''
            }

        ]
    },
    {
        percent:0.015,
        name:"8: GOV Genius Reward",
        vesting: 720,
        lock:3,
        nonLinear:false,
        wallets:[
            {
                amount:100000,
                address:''
            }

        ]
    },
    {
        percent:0.1,
        nonLinear:false,
        name:"9: Marketting",
        vesting: 720,
        lock: 1,
        wallets:[
            {
                amount:100000,
                address:''
            }

        ]
    },
    {
        percent:0.1,
        nonLinear:false,
        name:"10: Ecosystem",
        vesting: 1080,
        lock: 4,
        wallets:[
            {
                amount:100000,
                address:''
            }

        ]
    }

];
module.exports = {
    VESTING_SCHEDULE
};