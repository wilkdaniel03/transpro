import json
import sys
import random


PESEL_LENGTH = 11
PESEL_LOWER_BOUND = '0'
PESEL_UPPER_BOUND = '9'


def count_rec() -> None:
    file = open("./employees.json","r")
    data = json.load(file)
    file.close()

    c = 0
    for i in range(len(data)):
        pesel = data[i]['pesel']
        if len(pesel) == PESEL_LENGTH and all([c >= PESEL_LOWER_BOUND and c <= PESEL_UPPER_BOUND for c in pesel]):
            continue
        c = c + 1

    print("Found {} wrong records".format(c))


def correct() -> None:
    file = open("./employees.json","r")
    data = json.load(file)
    file.close()

    for i in range(len(data)):
        pesel = data[i]['pesel']
        new_pesel = []
        for j in range(PESEL_LENGTH):
            if len(pesel) == PESEL_LENGTH and all([c >= PESEL_LOWER_BOUND and c <= PESEL_UPPER_BOUND for c in pesel]):
                new_pesel.append(pesel[j])
            elif j > len(pesel) - 1:
                new_pesel.append(str(random.randint(0,9)))
            else:
                new_pesel.append(str(random.randint(0,9)))
        data[i]['pesel'] = ''.join(new_pesel)

    file = open("./employees.json","w")
    json.dump(data,file)
    file.close()



if __name__ == "__main__":
    if len(sys.argv) == 1:
        sys.exit(0)
    match sys.argv[1]:
        case "rec": count_rec()
        case "cor": raise NotImplementedError("cor not implemented")
        case "all":
            count_rec()
            correct()
