import os.path


def calculatePointsForBracket(bracket, correct, teams):
    points = 0

    # ROUND 1
    if bracket.games[0].winner == correct.games[0].winner:
        points += 10
    if bracket.games[1].winner == correct.games[1].winner:
        points += 10
    if bracket.games[2].winner == correct.games[2].winner:
        points += 10
    if bracket.games[3].winner == correct.games[3].winner:
        points += 10
    if bracket.games[4].winner == correct.games[4].winner:
        points += 10
    if bracket.games[5].winner == correct.games[5].winner:
        points += 10
    if bracket.games[6].winner == correct.games[6].winner:
        points += 10
    if bracket.games[7].winner == correct.games[7].winner:
        points += 10

    # ROUND 2
    if bracket.games[8].winner == correct.games[8].winner:
        points += 20
    if bracket.games[9].winner == correct.games[9].winner:
        points += 20
    if bracket.games[10].winner == correct.games[10].winner:
        points += 20
    if bracket.games[11].winner == correct.games[11].winner:
        points += 20

    # ROUND 3
    if bracket.games[12].winner == correct.games[12].winner:
        points += 40
    if bracket.games[13].winner == correct.games[13].winner:
        points += 40

    # WINNER
    if bracket.games[14].winner == correct.games[14].winner:
        points += 80

    return points


def calculateMaxPointsForBracket(bracket, correct, teams):
    max_points = 0

    # ROUND 1
    game1 = False
    game2 = False
    game3 = False
    game4 = False
    game5 = False
    game6 = False
    game7 = False
    game8 = False
    if (
        correct.games[0].winner not in teams
        or bracket.games[0].winner == correct.games[0].winner
    ):
        max_points += 10
        game1 = True
    if (
        correct.games[1].winner not in teams
        or bracket.games[1].winner == correct.games[1].winner
    ):
        max_points += 10
        game2 = True
    if (
        correct.games[2].winner not in teams
        or bracket.games[2].winner == correct.games[2].winner
    ):
        max_points += 10
        game3 = True
    if (
        correct.games[3].winner not in teams
        or bracket.games[3].winner == correct.games[3].winner
    ):
        max_points += 10
        game4 = True
    if (
        correct.games[4].winner not in teams
        or bracket.games[4].winner == correct.games[4].winner
    ):
        max_points += 10
        game5 = True
    if (
        correct.games[5].winner not in teams
        or bracket.games[5].winner == correct.games[5].winner
    ):
        max_points += 10
        game6 = True
    if (
        correct.games[6].winner not in teams
        or bracket.games[6].winner == correct.games[6].winner
    ):
        max_points += 10
        game7 = True
    if (
        correct.games[7].winner not in teams
        or bracket.games[7].winner == correct.games[7].winner
    ):
        max_points += 10
        game8 = True

    # ROUND 2
    game9 = False
    game10 = False
    game11 = False
    game12 = False

    if (bracket.games[8].winner == correct.games[8].winner) or (
        correct.games[8].winner not in teams
        and (
            (
                correct.games[0].winner not in teams
                and bracket.games[8].winner == bracket.games[0].winner
            )
            or (
                correct.games[1].winner not in teams
                and bracket.games[8].winner == bracket.games[1].winner
            )
            or (
                correct.games[0].winner in teams
                and correct.games[0].winner == bracket.games[8].winner
            )
            or (
                correct.games[1].winner in teams
                and correct.games[1].winner == bracket.games[8].winner
            )
        )
    ):
        max_points += 20
        game9 = True

    if (bracket.games[9].winner == correct.games[9].winner) or (
        correct.games[9].winner not in teams
        and (
            (
                correct.games[2].winner not in teams
                and bracket.games[9].winner == bracket.games[2].winner
            )
            or (
                correct.games[3].winner not in teams
                and bracket.games[9].winner == bracket.games[3].winner
            )
            or (
                correct.games[2].winner in teams
                and correct.games[2].winner == bracket.games[9].winner
            )
            or (
                correct.games[3].winner in teams
                and correct.games[3].winner == bracket.games[9].winner
            )
        )
    ):
        max_points += 20
        game10 = True

    if (bracket.games[10].winner == correct.games[10].winner) or (
        correct.games[10].winner not in teams
        and (
            (
                correct.games[4].winner not in teams
                and bracket.games[10].winner == bracket.games[4].winner
            )
            or (
                correct.games[5].winner not in teams
                and bracket.games[10].winner == bracket.games[5].winner
            )
            or (
                correct.games[4].winner in teams
                and correct.games[4].winner == bracket.games[10].winner
            )
            or (
                correct.games[5].winner in teams
                and correct.games[5].winner == bracket.games[10].winner
            )
        )
    ):
        max_points += 20
        game11 = True

    if (bracket.games[11].winner == correct.games[11].winner) or (
        correct.games[11].winner not in teams
        and (
            (
                correct.games[6].winner not in teams
                and bracket.games[11].winner == bracket.games[6].winner
            )
            or (
                correct.games[7].winner not in teams
                and bracket.games[11].winner == bracket.games[7].winner
            )
            or (
                correct.games[6].winner in teams
                and correct.games[6].winner == bracket.games[11].winner
            )
            or (
                correct.games[7].winner in teams
                and correct.games[7].winner == bracket.games[11].winner
            )
        )
    ):
        max_points += 20
        game12 = True

    # ROUND 3
    game13 = False
    game14 = False

    if (bracket.games[12].winner == correct.games[12].winner) or (
        correct.games[12].winner not in teams
        and (
            game9
            and bracket.games[8].winner == bracket.games[12].winner
            or game10
            and bracket.games[9].winner == bracket.games[12].winner
        )
    ):
        max_points += 40
        game13 = True

    if (bracket.games[13].winner == correct.games[13].winner) or (
        correct.games[13].winner not in teams
        and (
            (game11 and bracket.games[10].winner == bracket.games[13].winner)
            or (game12 and bracket.games[11].winner == bracket.games[13].winner)
        )
    ):
        max_points += 40
        game14 = True

    # WINNER
    if (bracket.games[14].winner == correct.games[14].winner) or (
        correct.games[14].winner not in teams
        and (
            (game13 and bracket.games[12].winner == bracket.games[14].winner)
            or (game14 and bracket.games[13].winner == bracket.games[14].winner)
        )
    ):
        max_points += 80

    return max_points


# this is for checking the image urls are correct
def checkImgUrls(default_brackets):
    path = os.path.dirname(os.path.abspath(__file__))[:-4]
    for game in default_brackets.games:
        url_list = game.home.split(" ")
        url = "".join(url_list[1:]).replace(".", "")
        # print(url)
        # print(os.path.isfile(f"{path}/static/images/{url}.svg"))

        url_list = game.away.split(" ")
        url = "".join(url_list[1:]).replace(".", "")
        # print(url)
        # print(os.path.isfile(f"{path}/static/images/{url}.svg"))
