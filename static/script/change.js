function cData(data_id) {
    switch (data_id) {
        case 0:
            return "―";
            break;
        case 1:
            return "月1";
            break;
        case 2:
            return "月2";
            break;
        case 3:
            return "月3";
            break;
        case 4:
            return "月4";
            break;
        case 5:
            return "月5";
            break;
        case 6:
            return "火1";
            break;
        case 7:
            return "火2";
            break;
        case 8:
            return "火3";
            break;
        case 9:
            return "火4";
            break;
        case 10:
            return "火5";
            break;
        case 11:
            return "水1";
            break;
        case 12:
            return "水2";
            break;
        case 13:
            return "水3";
            break;
        case 14:
            return "水4";
            break;
        case 15:
            return "水5";
            break;
        case 16:
            return "木1";
            break;
        case 17:
            return "木2";
            break;
        case 18:
            return "木3";
            break;
        case 19:
            return "木4";
            break;
        case 20:
            return "木5";
            break;
        case 21:
            return "金1";
            break;
        case 22:
            return "金2";
            break;
        case 23:
            return "金3";
            break;
        case 24:
            return "金4";
            break;
        case 25:
            return "金5";
            break;
        case 26:
            return "土1";
            break;
        case 27:
            return "土2";
            break;
        case 28:
            return "土3";
            break;
        case 29:
            return "土4";
            break;
        case 30:
            return "土5";
            break;
        default:
            return "未設定";
            break;
    }
}

function cQuarter(quarter) {
    switch (quarter) {
        case 3:
            return "後期";
            break;
        case 4:
            return "後期前半";
            break;
        case 5:
            return "後期後半";
            break;
    }
}

function cClass(d_class) {
    switch (d_class) {
        case 0:
            return "―";
            break;
        default:
            return d_class;
            break;
    }
}

function cCategory(category) {
    switch (category) {
        case 0:
            return "―";
            break;
        case 1:
            return "基礎科目[外国語]・必修";
            break;
        case 2:
            return "基礎科目[外国語(英語)]・選択";
            break;
        case 3:
            return "基礎科目[教養]・選択";
            break;
        case 4:
            return "専門基礎科目・必修";
            break;
        case 5:
            return "専門基礎科目・選択";
            break;
        case 6:
            return "専門科目・必修";
            break;
        case 7:
            return "専門科目[学科基盤]・必修";
            break;
        case 8:
            return "専門科目[学科基盤]・選必１";
            break;
        case 9:
            return "専門科目[学科基盤]・選必２";
            break;
        case 10:
            return "専門科目・選択";
            break;
        case 11:
            return "自由選択科目";
            break;
        case 12:
            return "教職科目";
            break;
    }
}

function cPossible(possible) {
    switch (possible) {
        case 0:
            return "―";
            break;
        case 1:
            return "1年";
            break;
        case 2:
            return "2年";
            break;
        case 3:
            return "3年";
            break;
        case 4:
            return "4年";
            break;
    }
}