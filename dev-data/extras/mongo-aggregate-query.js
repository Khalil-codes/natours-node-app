const capitalWord = `$concat: [
                        {
                            $toUpper: {
                                $substrCP: ["$difficulty", 0, 1],
                            },
                        },
                        {
                            $substrCP: [
                                "$difficulty",
                                1,
                                { $strLenCP: "$difficulty" },
                            ],
                        },
                    ],
                    `;
