import {Tournament} from '../entities/Tournament';

const TOURS: Tournament[] = [
    {
        _id: '234132423',
        name: 'ITMO tour',
        team_count: 2,
        prize_pool: 6,
        teams: [
            {
                _id: '451',
                name: 'MeTeam'
            }
        ]
        // matches: [
        //     {
        //         match_id: 2142412312,
        //         players: [
        //             {
        //                 player_id: 1234,
        //                 nickname: 'almdudler'
        //             },
        //             {
        //                 player_id: 54212,
        //                 nickname: 'simac'
        //             },
        //             {
        //                 player_id: 12123,
        //                 nickname: 'Ivan'
        //             },
        //             {
        //                 player_id: 596023,
        //                 nickname: 'Alexander'
        //             }
        //         ],
        //     },
        //     {
        //         match_id: 2142412312,
        //         players: [
        //             {
        //                 player_id: 1234,
        //                 nickname: 'almdudler'
        //             },
        //             {
        //                 player_id: 54212,
        //                 nickname: 'simac'
        //             },
        //             {
        //                 player_id: 12123,
        //                 nickname: 'Ivan'
        //             },
        //             {
        //                 player_id: 596023,
        //                 nickname: 'Alexander'
        //             }
        //         ],
        //     },
        // ]
    },
    {
        _id: '3413423514',
        name: 'Tour2',
        team_count: 2,
        prize_pool: 6,
        teams: [
            {
                _id: '3513531',
                name: 'MeTeam2'
            }
        ]
        // matches: [
        //     {
        //         match_id: 2142412312,
        //         players: [
        //             {
        //                 player_id: 1234,
        //                 nickname: 'almdudler'
        //             },
        //             {
        //                 player_id: 54212,
        //                 nickname: 'simac'
        //             },
        //             {
        //                 player_id: 12123,
        //                 nickname: 'Ivan'
        //             },
        //             {
        //                 player_id: 596023,
        //                 nickname: 'Alexander'
        //             }
        //         ],
        //     },
        //     {
        //         match_id: 2142412312,
        //         players: [
        //             {
        //                 player_id: 1234,
        //                 nickname: 'almdudler'
        //             },
        //             {
        //                 player_id: 54212,
        //                 nickname: 'simac'
        //             },
        //             {
        //                 player_id: 12123,
        //                 nickname: 'Ivan'
        //             },
        //             {
        //                 player_id: 596023,
        //                 nickname: 'Alexander'
        //             }
        //         ],
        //     },
        // ]
    }
];

export const resp = {
    status: 'ok',
    count: '2',
    tournaments: TOURS
};
