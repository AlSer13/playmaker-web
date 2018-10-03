import {Tournament} from './Tournament';

const TOURS: Tournament[] = [
    {
        _id: 1,
        name: 'ITMO tour',
        matches: [
            {
                match_id: 2142412312,
                players: [
                    {
                        player_id: 1234,
                        nickname: 'almdudler'
                    },
                    {
                        player_id: 54212,
                        nickname: 'simac'
                    },
                    {
                        player_id: 12123,
                        nickname: 'Ivan'
                    },
                    {
                        player_id: 596023,
                        nickname: 'Alexander'
                    }
                ],
            },
            {
                match_id: 2142412312,
                players: [
                    {
                        player_id: 1234,
                        nickname: 'almdudler'
                    },
                    {
                        player_id: 54212,
                        nickname: 'simac'
                    },
                    {
                        player_id: 12123,
                        nickname: 'Ivan'
                    },
                    {
                        player_id: 596023,
                        nickname: 'Alexander'
                    }
                ],
            },
        ]
    },
    {
        _id: 2,
        name: 'Tour2',
        matches: [
            {
                match_id: 2142412312,
                players: [
                    {
                        player_id: 1234,
                        nickname: 'almdudler'
                    },
                    {
                        player_id: 54212,
                        nickname: 'simac'
                    },
                    {
                        player_id: 12123,
                        nickname: 'Ivan'
                    },
                    {
                        player_id: 596023,
                        nickname: 'Alexander'
                    }
                ],
            },
            {
                match_id: 2142412312,
                players: [
                    {
                        player_id: 1234,
                        nickname: 'almdudler'
                    },
                    {
                        player_id: 54212,
                        nickname: 'simac'
                    },
                    {
                        player_id: 12123,
                        nickname: 'Ivan'
                    },
                    {
                        player_id: 596023,
                        nickname: 'Alexander'
                    }
                ],
            },
        ]
    }
];

export const resp = {
    status: 'ok',
    count: '2',
    tournaments: TOURS
};
