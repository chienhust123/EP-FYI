import { ACCOUNT_API_PATH } from "../account"
import { mockAxios } from "../api-client"
import { GetAggregatedCompanyStatsListResponse, OFFER_API_PATH } from "../offer"

mockAxios.onPost(ACCOUNT_API_PATH.GET_ACCOUNT_SESSION).reply(
  200,
  {
    account: {
      name: 'Daniel',
      email: 'tandung251298@gmail.com',
      picture: 'https://lh3.googleusercontent.com/ogw/AF2bZygl_79h9ZThodhkjkXrPAKsCFdJDJ6H825TOnnXEyJI5u0=s32-c-mo',
      id: '1234'
    }
  }
)


mockAxios.onPost(OFFER_API_PATH.GET_AGGREGATED_COMPANY_STATS_LIST).reply(200, {
  company_stat_list: [
    {
      company: {
        id: 123,
        name: 'Bytedance',
        profile_image_url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAADSCAMAAABD772dAAAAw1BMVEX///95590uWrUAydM5jf+B6N/X+PUrWLTN1+1CaLv5/v72+v+Etf+M4+j0/f2wz/9v3eMwiv8iU7IAy9Tz+f/t+/p/6N6g7udy5tvI9fGW7OTw/Pvi6fVSdMClt96uvuHQ8/ZN1t3i+fq77vJlpv88kf+Yq9iPu//R5P+z8evN9vGa7eW78u1hgcaIoNS4x+Zwjcs3Yrnk6vVpiMhBZ7qi6eyI4+hl2uGdxf/c6/9Mmf+40/9zq//A2/+lyP97ls/I0uoYrnA8AAAEhklEQVR4nO3dbVeyQBAGYCEBtcKkVNIsw7QsrSzrKXv9/7/qmRXsWMnKW6ws9/25c9zrzLDzqdlCQYroraFer4g+RYrRG7aiNUd63RR9kpSiawqL1moe6nXRh0kjHlhR7Dnakb67v8Cu2tYIbcqs/g722nt46bRlRa8AU3cr2hWhpTSvArvoBlVab4s+X+LxA7tftK2wMS3VN80DL25vb0xviz5rIlkLnqNpYo0K4+ubI9HHjZ9A4HkKlmUZHUIfZLrDQ4BVVTUMyyjfDggt+tyREw7smSedj8FnRts7NNhVW+qkc3tcyuA9Fg1MZEJb1oTQd9lSRwUvKm2pneuTLKHjgb32Lo8JnZF7LD7YvcfUKU2sO9GaAEkC7KKNxZgWTeInKfBXqcv3xxtd6ETBrnlaEo3iJWkwkXMHLgO8SQEYYIABBlg0iheAAQYYYIBFo3gBGGCAAQZYNIoXgAEGGGCARaN4ARhggAEGWDSKF4ABBhhggEWjeAEYYIABBliwqdLu7p4++PyzkWxg0+k+7O1vbW3t5gFM2MdTps0FWH/YO933tJKDK6bDsFvfIiu4Und6jz+x0oLNbm/33yqtlOB279EPKx14Pmj9rXKBvwbtmkgCrvR+Xcdyg829QFqAAQYYYIABBhhggAEGGGCANxicwMKeTIG3n3aqzzG3rWULvFOr1WaEPohe6qyBi0Uy98/OX57vopU6e2CWWq04eyV0hDVF2QS75v7s9ektrDmzYE/N2vstzLq1bIM99Gzn/S1oe2cfvCg0oYOs4ZICvPimz2hi5QbsVZqN6QvemJYK7KnpHvMvtHzgubmaL3CxCDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwzw6nR91w1LCvZ2LK83ywMucLZoywp243AX80oIplTma/9XquUEs9SX3jrIBZhiEvrnPSY12FXTxNqsdx7+GMxS7+0uLrJ8gAtsh7w7ph/zAi6wRwJoTG/AazypgbkBGGCAAQYYYLnB05yBrUl+wIZhWZPxwGdfo1xgQyWsNf04KfkuIpUHbFDUSefj5Ii7dFUSMLWxMe18HH+uXTwqBdiyVIbll1YOMLugLHU8+Ay8PDgguMbbaykKTG08Kd8PPkOthw4Apj9g+8UjbNoOnPBgNno6t4Obo7BLz9eA2V7xs/PqxV9qC2HB8xvqfnBTinIq/vbhPsMGugviJQSYvlmrc31zFLUEPmC2dLj/+n4RZpF4jIQAjwkb56dWgN1V8e9/3cbLCQq2ldgPcfwEU2FnO09va5doJ5sgYFtpaFfD2D/14xUA9ghAlJcPYmY92CbspdOO/1MLMPtoz84JG/MZk2jhg21Fa146ZjInY2Bv0KbcxsvhgLVW87Ke4E8ROI1BuyY+YK01PEyijZez/VJNa/Zw8htsK63moV4X8oGlkO9g225cjfS2rFiWLzDdT1rz0JHZOo8HpgtqJG8bL0dvsNEz0h1T9ElSit4aBqzsfw2lSZ9iE2euAAAAAElFTkSuQmCC'
      },

      total_submission_count: 12
    },
    {
      company: {
        id: 123,
        name: 'Shopee',
        profile_image_url: 'data:image/png;base64,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'
      },

      total_submission_count: 15
    },
    {
      company: {
        id: 124,
        name: 'Grab',
        profile_image_url: 'data:image/png;base64,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'
      },

      total_submission_count: 10
    }
  ],
  previous_cursor: undefined,
  nextCompanyId: undefined,
  nextCompanyName: undefined,
} as GetAggregatedCompanyStatsListResponse)

mockAxios.onPost(OFFER_API_PATH.GET_OFFER_LIST).reply(200, {
  "offer_list": [
    {
      "id": 1,
      "company": {
        "id": 101,
        "name": "Tech Innovators",
        "profile_image_url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAADSCAMAAABD772dAAAAw1BMVEX///95590uWrUAydM5jf+B6N/X+PUrWLTN1+1CaLv5/v72+v+Etf+M4+j0/f2wz/9v3eMwiv8iU7IAy9Tz+f/t+/p/6N6g7udy5tvI9fGW7OTw/Pvi6fVSdMClt96uvuHQ8/ZN1t3i+fq77vJlpv88kf+Yq9iPu//R5P+z8evN9vGa7eW78u1hgcaIoNS4x+Zwjcs3Yrnk6vVpiMhBZ7qi6eyI4+hl2uGdxf/c6/9Mmf+40/9zq//A2/+lyP97ls/I0uoYrnA8AAAEhklEQVR4nO3dbVeyQBAGYCEBtcKkVNIsw7QsrSzrKXv9/7/qmRXsWMnKW6ws9/25c9zrzLDzqdlCQYroraFer4g+RYrRG7aiNUd63RR9kpSiawqL1moe6nXRh0kjHlhR7Dnakb67v8Cu2tYIbcqs/g722nt46bRlRa8AU3cr2hWhpTSvArvoBlVab4s+X+LxA7tftK2wMS3VN80DL25vb0xviz5rIlkLnqNpYo0K4+ubI9HHjZ9A4HkKlmUZHUIfZLrDQ4BVVTUMyyjfDggt+tyREw7smSedj8FnRts7NNhVW+qkc3tcyuA9Fg1MZEJb1oTQd9lSRwUvKm2pneuTLKHjgb32Lo8JnZF7LD7YvcfUKU2sO9GaAEkC7KKNxZgWTeInKfBXqcv3xxtd6ETBrnlaEo3iJWkwkXMHLgO8SQEYYIABBlg0iheAAQYYYIBFo3gBGGCAAQZYNIoXgAEGGGCARaN4ARhggAEGWDSKF4ABBhhggEWjeAEYYIABBliwqdLu7p4++PyzkWxg0+k+7O1vbW3t5gFM2MdTps0FWH/YO933tJKDK6bDsFvfIiu4Und6jz+x0oLNbm/33yqtlOB279EPKx14Pmj9rXKBvwbtmkgCrvR+Xcdyg829QFqAAQYYYIABBhhggAEGGGCANxicwMKeTIG3n3aqzzG3rWULvFOr1WaEPohe6qyBi0Uy98/OX57vopU6e2CWWq04eyV0hDVF2QS75v7s9ektrDmzYE/N2vstzLq1bIM99Gzn/S1oe2cfvCg0oYOs4ZICvPimz2hi5QbsVZqN6QvemJYK7KnpHvMvtHzgubmaL3CxCDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwzw6nR91w1LCvZ2LK83ywMucLZoywp243AX80oIplTma/9XquUEs9SX3jrIBZhiEvrnPSY12FXTxNqsdx7+GMxS7+0uLrJ8gAtsh7w7ph/zAi6wRwJoTG/AazypgbkBGGCAAQYYYLnB05yBrUl+wIZhWZPxwGdfo1xgQyWsNf04KfkuIpUHbFDUSefj5Ii7dFUSMLWxMe18HH+uXTwqBdiyVIbll1YOMLugLHU8+Ay8PDgguMbbaykKTG08Kd8PPkOthw4Apj9g+8UjbNoOnPBgNno6t4Obo7BLz9eA2V7xs/PqxV9qC2HB8xvqfnBTinIq/vbhPsMGugviJQSYvlmrc31zFLUEPmC2dLj/+n4RZpF4jIQAjwkb56dWgN1V8e9/3cbLCQq2ldgPcfwEU2FnO09va5doJ5sgYFtpaFfD2D/14xUA9ghAlJcPYmY92CbspdOO/1MLMPtoz84JG/MZk2jhg21Fa146ZjInY2Bv0KbcxsvhgLVW87Ke4E8ROI1BuyY+YK01PEyijZez/VJNa/Zw8htsK63moV4X8oGlkO9g225cjfS2rFiWLzDdT1rz0JHZOo8HpgtqJG8bL0dvsNEz0h1T9ElSit4aBqzsfw2lSZ9iE2euAAAAAElFTkSuQmCC"
      },
      "location": {
        "id": 201,
        "country": "US",
        "state": "CA",
        "city": "San Francisco"
      },
      "position": {
        "id": 301,
        "title": "Software Engineer",
        "level": "Mid"
      },
      "total_package": {
        "amount": 120000,
        "currency": "USD"
      },
      "image_url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAADSCAMAAABD772dAAAAw1BMVEX///95590uWrUAydM5jf+B6N/X+PUrWLTN1+1CaLv5/v72+v+Etf+M4+j0/f2wz/9v3eMwiv8iU7IAy9Tz+f/t+/p/6N6g7udy5tvI9fGW7OTw/Pvi6fVSdMClt96uvuHQ8/ZN1t3i+fq77vJlpv88kf+Yq9iPu//R5P+z8evN9vGa7eW78u1hgcaIoNS4x+Zwjcs3Yrnk6vVpiMhBZ7qi6eyI4+hl2uGdxf/c6/9Mmf+40/9zq//A2/+lyP97ls/I0uoYrnA8AAAEhklEQVR4nO3dbVeyQBAGYCEBtcKkVNIsw7QsrSzrKXv9/7/qmRXsWMnKW6ws9/25c9zrzLDzqdlCQYroraFer4g+RYrRG7aiNUd63RR9kpSiawqL1moe6nXRh0kjHlhR7Dnakb67v8Cu2tYIbcqs/g722nt46bRlRa8AU3cr2hWhpTSvArvoBlVab4s+X+LxA7tftK2wMS3VN80DL25vb0xviz5rIlkLnqNpYo0K4+ubI9HHjZ9A4HkKlmUZHUIfZLrDQ4BVVTUMyyjfDggt+tyREw7smSedj8FnRts7NNhVW+qkc3tcyuA9Fg1MZEJb1oTQd9lSRwUvKm2pneuTLKHjgb32Lo8JnZF7LD7YvcfUKU2sO9GaAEkC7KKNxZgWTeInKfBXqcv3xxtd6ETBrnlaEo3iJWkwkXMHLgO8SQEYYIABBlg0iheAAQYYYIBFo3gBGGCAAQZYNIoXgAEGGGCARaN4ARhggAEGWDSKF4ABBhhggEWjeAEYYIABBliwqdLu7p4++PyzkWxg0+k+7O1vbW3t5gFM2MdTps0FWH/YO933tJKDK6bDsFvfIiu4Und6jz+x0oLNbm/33yqtlOB279EPKx14Pmj9rXKBvwbtmkgCrvR+Xcdyg829QFqAAQYYYIABBhhggAEGGGCANxicwMKeTIG3n3aqzzG3rWULvFOr1WaEPohe6qyBi0Uy98/OX57vopU6e2CWWq04eyV0hDVF2QS75v7s9ektrDmzYE/N2vstzLq1bIM99Gzn/S1oe2cfvCg0oYOs4ZICvPimz2hi5QbsVZqN6QvemJYK7KnpHvMvtHzgubmaL3CxCDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwzw6nR91w1LCvZ2LK83ywMucLZoywp243AX80oIplTma/9XquUEs9SX3jrIBZhiEvrnPSY12FXTxNqsdx7+GMxS7+0uLrJ8gAtsh7w7ph/zAi6wRwJoTG/AazypgbkBGGCAAQYYYLnB05yBrUl+wIZhWZPxwGdfo1xgQyWsNf04KfkuIpUHbFDUSefj5Ii7dFUSMLWxMe18HH+uXTwqBdiyVIbll1YOMLugLHU8+Ay8PDgguMbbaykKTG08Kd8PPkOthw4Apj9g+8UjbNoOnPBgNno6t4Obo7BLz9eA2V7xs/PqxV9qC2HB8xvqfnBTinIq/vbhPsMGugviJQSYvlmrc31zFLUEPmC2dLj/+n4RZpF4jIQAjwkb56dWgN1V8e9/3cbLCQq2ldgPcfwEU2FnO09va5doJ5sgYFtpaFfD2D/14xUA9ghAlJcPYmY92CbspdOO/1MLMPtoz84JG/MZk2jhg21Fa146ZjInY2Bv0KbcxsvhgLVW87Ke4E8ROI1BuyY+YK01PEyijZez/VJNa/Zw8htsK63moV4X8oGlkO9g225cjfS2rFiWLzDdT1rz0JHZOo8HpgtqJG8bL0dvsNEz0h1T9ElSit4aBqzsfw2lSZ9iE2euAAAAAElFTkSuQmCC",
      "status": 1,
      "created_time": 1627891200
    },
    {
      "id": 2,
      "company": {
        "id": 102,
        "name": "Global Finance",
        "profile_image_url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAADSCAMAAABD772dAAAAw1BMVEX///95590uWrUAydM5jf+B6N/X+PUrWLTN1+1CaLv5/v72+v+Etf+M4+j0/f2wz/9v3eMwiv8iU7IAy9Tz+f/t+/p/6N6g7udy5tvI9fGW7OTw/Pvi6fVSdMClt96uvuHQ8/ZN1t3i+fq77vJlpv88kf+Yq9iPu//R5P+z8evN9vGa7eW78u1hgcaIoNS4x+Zwjcs3Yrnk6vVpiMhBZ7qi6eyI4+hl2uGdxf/c6/9Mmf+40/9zq//A2/+lyP97ls/I0uoYrnA8AAAEhklEQVR4nO3dbVeyQBAGYCEBtcKkVNIsw7QsrSzrKXv9/7/qmRXsWMnKW6ws9/25c9zrzLDzqdlCQYroraFer4g+RYrRG7aiNUd63RR9kpSiawqL1moe6nXRh0kjHlhR7Dnakb67v8Cu2tYIbcqs/g722nt46bRlRa8AU3cr2hWhpTSvArvoBlVab4s+X+LxA7tftK2wMS3VN80DL25vb0xviz5rIlkLnqNpYo0K4+ubI9HHjZ9A4HkKlmUZHUIfZLrDQ4BVVTUMyyjfDggt+tyREw7smSedj8FnRts7NNhVW+qkc3tcyuA9Fg1MZEJb1oTQd9lSRwUvKm2pneuTLKHjgb32Lo8JnZF7LD7YvcfUKU2sO9GaAEkC7KKNxZgWTeInKfBXqcv3xxtd6ETBrnlaEo3iJWkwkXMHLgO8SQEYYIABBlg0iheAAQYYYIBFo3gBGGCAAQZYNIoXgAEGGGCARaN4ARhggAEGWDSKF4ABBhhggEWjeAEYYIABBliwqdLu7p4++PyzkWxg0+k+7O1vbW3t5gFM2MdTps0FWH/YO933tJKDK6bDsFvfIiu4Und6jz+x0oLNbm/33yqtlOB279EPKx14Pmj9rXKBvwbtmkgCrvR+Xcdyg829QFqAAQYYYIABBhhggAEGGGCANxicwMKeTIG3n3aqzzG3rWULvFOr1WaEPohe6qyBi0Uy98/OX57vopU6e2CWWq04eyV0hDVF2QS75v7s9ektrDmzYE/N2vstzLq1bIM99Gzn/S1oe2cfvCg0oYOs4ZICvPimz2hi5QbsVZqN6QvemJYK7KnpHvMvtHzgubmaL3CxCDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwzw6nR91w1LCvZ2LK83ywMucLZoywp243AX80oIplTma/9XquUEs9SX3jrIBZhiEvrnPSY12FXTxNqsdx7+GMxS7+0uLrJ8gAtsh7w7ph/zAi6wRwJoTG/AazypgbkBGGCAAQYYYLnB05yBrUl+wIZhWZPxwGdfo1xgQyWsNf04KfkuIpUHbFDUSefj5Ii7dFUSMLWxMe18HH+uXTwqBdiyVIbll1YOMLugLHU8+Ay8PDgguMbbaykKTG08Kd8PPkOthw4Apj9g+8UjbNoOnPBgNno6t4Obo7BLz9eA2V7xs/PqxV9qC2HB8xvqfnBTinIq/vbhPsMGugviJQSYvlmrc31zFLUEPmC2dLj/+n4RZpF4jIQAjwkb56dWgN1V8e9/3cbLCQq2ldgPcfwEU2FnO09va5doJ5sgYFtpaFfD2D/14xUA9ghAlJcPYmY92CbspdOO/1MLMPtoz84JG/MZk2jhg21Fa146ZjInY2Bv0KbcxsvhgLVW87Ke4E8ROI1BuyY+YK01PEyijZez/VJNa/Zw8htsK63moV4X8oGlkO9g225cjfS2rFiWLzDdT1rz0JHZOo8HpgtqJG8bL0dvsNEz0h1T9ElSit4aBqzsfw2lSZ9iE2euAAAAAElFTkSuQmCC"
      },
      "location": {
        "id": 202,
        "country": "GB",
        "state": "",
        "city": "London"
      },
      "position": {
        "id": 302,
        "title": "Financial Analyst",
        "level": "Junior"
      },
      "total_package": {
        "amount": 70000,
        "currency": "GBP"
      },
      "image_url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAADSCAMAAABD772dAAAAw1BMVEX///95590uWrUAydM5jf+B6N/X+PUrWLTN1+1CaLv5/v72+v+Etf+M4+j0/f2wz/9v3eMwiv8iU7IAy9Tz+f/t+/p/6N6g7udy5tvI9fGW7OTw/Pvi6fVSdMClt96uvuHQ8/ZN1t3i+fq77vJlpv88kf+Yq9iPu//R5P+z8evN9vGa7eW78u1hgcaIoNS4x+Zwjcs3Yrnk6vVpiMhBZ7qi6eyI4+hl2uGdxf/c6/9Mmf+40/9zq//A2/+lyP97ls/I0uoYrnA8AAAEhklEQVR4nO3dbVeyQBAGYCEBtcKkVNIsw7QsrSzrKXv9/7/qmRXsWMnKW6ws9/25c9zrzLDzqdlCQYroraFer4g+RYrRG7aiNUd63RR9kpSiawqL1moe6nXRh0kjHlhR7Dnakb67v8Cu2tYIbcqs/g722nt46bRlRa8AU3cr2hWhpTSvArvoBlVab4s+X+LxA7tftK2wMS3VN80DL25vb0xviz5rIlkLnqNpYo0K4+ubI9HHjZ9A4HkKlmUZHUIfZLrDQ4BVVTUMyyjfDggt+tyREw7smSedj8FnRts7NNhVW+qkc3tcyuA9Fg1MZEJb1oTQd9lSRwUvKm2pneuTLKHjgb32Lo8JnZF7LD7YvcfUKU2sO9GaAEkC7KKNxZgWTeInKfBXqcv3xxtd6ETBrnlaEo3iJWkwkXMHLgO8SQEYYIABBlg0iheAAQYYYIBFo3gBGGCAAQZYNIoXgAEGGGCARaN4ARhggAEGWDSKF4ABBhhggEWjeAEYYIABBliwqdLu7p4++PyzkWxg0+k+7O1vbW3t5gFM2MdTps0FWH/YO933tJKDK6bDsFvfIiu4Und6jz+x0oLNbm/33yqtlOB279EPKx14Pmj9rXKBvwbtmkgCrvR+Xcdyg829QFqAAQYYYIABBhhggAEGGGCANxicwMKeTIG3n3aqzzG3rWULvFOr1WaEPohe6qyBi0Uy98/OX57vopU6e2CWWq04eyV0hDVF2QS75v7s9ektrDmzYE/N2vstzLq1bIM99Gzn/S1oe2cfvCg0oYOs4ZICvPimz2hi5QbsVZqN6QvemJYK7KnpHvMvtHzgubmaL3CxCDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwzw6nR91w1LCvZ2LK83ywMucLZoywp243AX80oIplTma/9XquUEs9SX3jrIBZhiEvrnPSY12FXTxNqsdx7+GMxS7+0uLrJ8gAtsh7w7ph/zAi6wRwJoTG/AazypgbkBGGCAAQYYYLnB05yBrUl+wIZhWZPxwGdfo1xgQyWsNf04KfkuIpUHbFDUSefj5Ii7dFUSMLWxMe18HH+uXTwqBdiyVIbll1YOMLugLHU8+Ay8PDgguMbbaykKTG08Kd8PPkOthw4Apj9g+8UjbNoOnPBgNno6t4Obo7BLz9eA2V7xs/PqxV9qC2HB8xvqfnBTinIq/vbhPsMGugviJQSYvlmrc31zFLUEPmC2dLj/+n4RZpF4jIQAjwkb56dWgN1V8e9/3cbLCQq2ldgPcfwEU2FnO09va5doJ5sgYFtpaFfD2D/14xUA9ghAlJcPYmY92CbspdOO/1MLMPtoz84JG/MZk2jhg21Fa146ZjInY2Bv0KbcxsvhgLVW87Ke4E8ROI1BuyY+YK01PEyijZez/VJNa/Zw8htsK63moV4X8oGlkO9g225cjfS2rFiWLzDdT1rz0JHZOo8HpgtqJG8bL0dvsNEz0h1T9ElSit4aBqzsfw2lSZ9iE2euAAAAAElFTkSuQmCC",
      "status": 2,
      "created_time": 1627977600
    },
    {
      "id": 3,
      "company": {
        "id": 103,
        "name": "Healthcare Solutions",
        "profile_image_url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAADSCAMAAABD772dAAAAw1BMVEX///95590uWrUAydM5jf+B6N/X+PUrWLTN1+1CaLv5/v72+v+Etf+M4+j0/f2wz/9v3eMwiv8iU7IAy9Tz+f/t+/p/6N6g7udy5tvI9fGW7OTw/Pvi6fVSdMClt96uvuHQ8/ZN1t3i+fq77vJlpv88kf+Yq9iPu//R5P+z8evN9vGa7eW78u1hgcaIoNS4x+Zwjcs3Yrnk6vVpiMhBZ7qi6eyI4+hl2uGdxf/c6/9Mmf+40/9zq//A2/+lyP97ls/I0uoYrnA8AAAEhklEQVR4nO3dbVeyQBAGYCEBtcKkVNIsw7QsrSzrKXv9/7/qmRXsWMnKW6ws9/25c9zrzLDzqdlCQYroraFer4g+RYrRG7aiNUd63RR9kpSiawqL1moe6nXRh0kjHlhR7Dnakb67v8Cu2tYIbcqs/g722nt46bRlRa8AU3cr2hWhpTSvArvoBlVab4s+X+LxA7tftK2wMS3VN80DL25vb0xviz5rIlkLnqNpYo0K4+ubI9HHjZ9A4HkKlmUZHUIfZLrDQ4BVVTUMyyjfDggt+tyREw7smSedj8FnRts7NNhVW+qkc3tcyuA9Fg1MZEJb1oTQd9lSRwUvKm2pneuTLKHjgb32Lo8JnZF7LD7YvcfUKU2sO9GaAEkC7KKNxZgWTeInKfBXqcv3xxtd6ETBrnlaEo3iJWkwkXMHLgO8SQEYYIABBlg0iheAAQYYYIBFo3gBGGCAAQZYNIoXgAEGGGCARaN4ARhggAEGWDSKF4ABBhhggEWjeAEYYIABBliwqdLu7p4++PyzkWxg0+k+7O1vbW3t5gFM2MdTps0FWH/YO933tJKDK6bDsFvfIiu4Und6jz+x0oLNbm/33yqtlOB279EPKx14Pmj9rXKBvwbtmkgCrvR+Xcdyg829QFqAAQYYYIABBhhggAEGGGCANxicwMKeTIG3n3aqzzG3rWULvFOr1WaEPohe6qyBi0Uy98/OX57vopU6e2CWWq04eyV0hDVF2QS75v7s9ektrDmzYE/N2vstzLq1bIM99Gzn/S1oe2cfvCg0oYOs4ZICvPimz2hi5QbsVZqN6QvemJYK7KnpHvMvtHzgubmaL3CxCDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwzw6nR91w1LCvZ2LK83ywMucLZoywp243AX80oIplTma/9XquUEs9SX3jrIBZhiEvrnPSY12FXTxNqsdx7+GMxS7+0uLrJ8gAtsh7w7ph/zAi6wRwJoTG/AazypgbkBGGCAAQYYYLnB05yBrUl+wIZhWZPxwGdfo1xgQyWsNf04KfkuIpUHbFDUSefj5Ii7dFUSMLWxMe18HH+uXTwqBdiyVIbll1YOMLugLHU8+Ay8PDgguMbbaykKTG08Kd8PPkOthw4Apj9g+8UjbNoOnPBgNno6t4Obo7BLz9eA2V7xs/PqxV9qC2HB8xvqfnBTinIq/vbhPsMGugviJQSYvlmrc31zFLUEPmC2dLj/+n4RZpF4jIQAjwkb56dWgN1V8e9/3cbLCQq2ldgPcfwEU2FnO09va5doJ5sgYFtpaFfD2D/14xUA9ghAlJcPYmY92CbspdOO/1MLMPtoz84JG/MZk2jhg21Fa146ZjInY2Bv0KbcxsvhgLVW87Ke4E8ROI1BuyY+YK01PEyijZez/VJNa/Zw8htsK63moV4X8oGlkO9g225cjfS2rFiWLzDdT1rz0JHZOo8HpgtqJG8bL0dvsNEz0h1T9ElSit4aBqzsfw2lSZ9iE2euAAAAAElFTkSuQmCC"
      },
      "location": {
        "id": 203,
        "country": "CA",
        "state": "ON",
        "city": "Toronto"
      },
      "position": {
        "id": 303,
        "title": "Data Scientist",
        "level": "Senior"
      },
      "total_package": {
        "amount": 95000,
        "currency": "CAD"
      },
      "image_url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAADSCAMAAABD772dAAAAw1BMVEX///95590uWrUAydM5jf+B6N/X+PUrWLTN1+1CaLv5/v72+v+Etf+M4+j0/f2wz/9v3eMwiv8iU7IAy9Tz+f/t+/p/6N6g7udy5tvI9fGW7OTw/Pvi6fVSdMClt96uvuHQ8/ZN1t3i+fq77vJlpv88kf+Yq9iPu//R5P+z8evN9vGa7eW78u1hgcaIoNS4x+Zwjcs3Yrnk6vVpiMhBZ7qi6eyI4+hl2uGdxf/c6/9Mmf+40/9zq//A2/+lyP97ls/I0uoYrnA8AAAEhklEQVR4nO3dbVeyQBAGYCEBtcKkVNIsw7QsrSzrKXv9/7/qmRXsWMnKW6ws9/25c9zrzLDzqdlCQYroraFer4g+RYrRG7aiNUd63RR9kpSiawqL1moe6nXRh0kjHlhR7Dnakb67v8Cu2tYIbcqs/g722nt46bRlRa8AU3cr2hWhpTSvArvoBlVab4s+X+LxA7tftK2wMS3VN80DL25vb0xviz5rIlkLnqNpYo0K4+ubI9HHjZ9A4HkKlmUZHUIfZLrDQ4BVVTUMyyjfDggt+tyREw7smSedj8FnRts7NNhVW+qkc3tcyuA9Fg1MZEJb1oTQd9lSRwUvKm2pneuTLKHjgb32Lo8JnZF7LD7YvcfUKU2sO9GaAEkC7KKNxZgWTeInKfBXqcv3xxtd6ETBrnlaEo3iJWkwkXMHLgO8SQEYYIABBlg0iheAAQYYYIBFo3gBGGCAAQZYNIoXgAEGGGCARaN4ARhggAEGWDSKF4ABBhhggEWjeAEYYIABBliwqdLu7p4++PyzkWxg0+k+7O1vbW3t5gFM2MdTps0FWH/YO933tJKDK6bDsFvfIiu4Und6jz+x0oLNbm/33yqtlOB279EPKx14Pmj9rXKBvwbtmkgCrvR+Xcdyg829QFqAAQYYYIABBhhggAEGGGCANxicwMKeTIG3n3aqzzG3rWULvFOr1WaEPohe6qyBi0Uy98/OX57vopU6e2CWWq04eyV0hDVF2QS75v7s9ektrDmzYE/N2vstzLq1bIM99Gzn/S1oe2cfvCg0oYOs4ZICvPimz2hi5QbsVZqN6QvemJYK7KnpHvMvtHzgubmaL3CxCDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwzw6nR91w1LCvZ2LK83ywMucLZoywp243AX80oIplTma/9XquUEs9SX3jrIBZhiEvrnPSY12FXTxNqsdx7+GMxS7+0uLrJ8gAtsh7w7ph/zAi6wRwJoTG/AazypgbkBGGCAAQYYYLnB05yBrUl+wIZhWZPxwGdfo1xgQyWsNf04KfkuIpUHbFDUSefj5Ii7dFUSMLWxMe18HH+uXTwqBdiyVIbll1YOMLugLHU8+Ay8PDgguMbbaykKTG08Kd8PPkOthw4Apj9g+8UjbNoOnPBgNno6t4Obo7BLz9eA2V7xs/PqxV9qC2HB8xvqfnBTinIq/vbhPsMGugviJQSYvlmrc31zFLUEPmC2dLj/+n4RZpF4jIQAjwkb56dWgN1V8e9/3cbLCQq2ldgPcfwEU2FnO09va5doJ5sgYFtpaFfD2D/14xUA9ghAlJcPYmY92CbspdOO/1MLMPtoz84JG/MZk2jhg21Fa146ZjInY2Bv0KbcxsvhgLVW87Ke4E8ROI1BuyY+YK01PEyijZez/VJNa/Zw8htsK63moV4X8oGlkO9g225cjfS2rFiWLzDdT1rz0JHZOo8HpgtqJG8bL0dvsNEz0h1T9ElSit4aBqzsfw2lSZ9iE2euAAAAAElFTkSuQmCC",
      "status": 3,
      "created_time": 1628064000
    },
    {
      "id": 4,
      "company": {
        "id": 104,
        "name": "Retail Giants",
        "profile_image_url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAADSCAMAAABD772dAAAAw1BMVEX///95590uWrUAydM5jf+B6N/X+PUrWLTN1+1CaLv5/v72+v+Etf+M4+j0/f2wz/9v3eMwiv8iU7IAy9Tz+f/t+/p/6N6g7udy5tvI9fGW7OTw/Pvi6fVSdMClt96uvuHQ8/ZN1t3i+fq77vJlpv88kf+Yq9iPu//R5P+z8evN9vGa7eW78u1hgcaIoNS4x+Zwjcs3Yrnk6vVpiMhBZ7qi6eyI4+hl2uGdxf/c6/9Mmf+40/9zq//A2/+lyP97ls/I0uoYrnA8AAAEhklEQVR4nO3dbVeyQBAGYCEBtcKkVNIsw7QsrSzrKXv9/7/qmRXsWMnKW6ws9/25c9zrzLDzqdlCQYroraFer4g+RYrRG7aiNUd63RR9kpSiawqL1moe6nXRh0kjHlhR7Dnakb67v8Cu2tYIbcqs/g722nt46bRlRa8AU3cr2hWhpTSvArvoBlVab4s+X+LxA7tftK2wMS3VN80DL25vb0xviz5rIlkLnqNpYo0K4+ubI9HHjZ9A4HkKlmUZHUIfZLrDQ4BVVTUMyyjfDggt+tyREw7smSedj8FnRts7NNhVW+qkc3tcyuA9Fg1MZEJb1oTQd9lSRwUvKm2pneuTLKHjgb32Lo8JnZF7LD7YvcfUKU2sO9GaAEkC7KKNxZgWTeInKfBXqcv3xxtd6ETBrnlaEo3iJWkwkXMHLgO8SQEYYIABBlg0iheAAQYYYIBFo3gBGGCAAQZYNIoXgAEGGGCARaN4ARhggAEGWDSKF4ABBhhggEWjeAEYYIABBliwqdLu7p4++PyzkWxg0+k+7O1vbW3t5gFM2MdTps0FWH/YO933tJKDK6bDsFvfIiu4Und6jz+x0oLNbm/33yqtlOB279EPKx14Pmj9rXKBvwbtmkgCrvR+Xcdyg829QFqAAQYYYIABBhhggAEGGGCANxicwMKeTIG3n3aqzzG3rWULvFOr1WaEPohe6qyBi0Uy98/OX57vopU6e2CWWq04eyV0hDVF2QS75v7s9ektrDmzYE/N2vstzLq1bIM99Gzn/S1oe2cfvCg0oYOs4ZICvPimz2hi5QbsVZqN6QvemJYK7KnpHvMvtHzgubmaL3CxCDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwzw6nR91w1LCvZ2LK83ywMucLZoywp243AX80oIplTma/9XquUEs9SX3jrIBZhiEvrnPSY12FXTxNqsdx7+GMxS7+0uLrJ8gAtsh7w7ph/zAi6wRwJoTG/AazypgbkBGGCAAQYYYLnB05yBrUl+wIZhWZPxwGdfo1xgQyWsNf04KfkuIpUHbFDUSefj5Ii7dFUSMLWxMe18HH+uXTwqBdiyVIbll1YOMLugLHU8+Ay8PDgguMbbaykKTG08Kd8PPkOthw4Apj9g+8UjbNoOnPBgNno6t4Obo7BLz9eA2V7xs/PqxV9qC2HB8xvqfnBTinIq/vbhPsMGugviJQSYvlmrc31zFLUEPmC2dLj/+n4RZpF4jIQAjwkb56dWgN1V8e9/3cbLCQq2ldgPcfwEU2FnO09va5doJ5sgYFtpaFfD2D/14xUA9ghAlJcPYmY92CbspdOO/1MLMPtoz84JG/MZk2jhg21Fa146ZjInY2Bv0KbcxsvhgLVW87Ke4E8ROI1BuyY+YK01PEyijZez/VJNa/Zw8htsK63moV4X8oGlkO9g225cjfS2rFiWLzDdT1rz0JHZOo8HpgtqJG8bL0dvsNEz0h1T9ElSit4aBqzsfw2lSZ9iE2euAAAAAElFTkSuQmCC"
      },
      "location": {
        "id": 204,
        "country": "AU",
        "state": "NSW",
        "city": "Sydney"
      },
      "position": {
        "id": 304,
        "title": "Marketing Manager",
        "level": "Mid"
      },
      "total_package": {
        "amount": 85000,
        "currency": "AUD"
      },
      "image_url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAADSCAMAAABD772dAAAAw1BMVEX///95590uWrUAydM5jf+B6N/X+PUrWLTN1+1CaLv5/v72+v+Etf+M4+j0/f2wz/9v3eMwiv8iU7IAy9Tz+f/t+/p/6N6g7udy5tvI9fGW7OTw/Pvi6fVSdMClt96uvuHQ8/ZN1t3i+fq77vJlpv88kf+Yq9iPu//R5P+z8evN9vGa7eW78u1hgcaIoNS4x+Zwjcs3Yrnk6vVpiMhBZ7qi6eyI4+hl2uGdxf/c6/9Mmf+40/9zq//A2/+lyP97ls/I0uoYrnA8AAAEhklEQVR4nO3dbVeyQBAGYCEBtcKkVNIsw7QsrSzrKXv9/7/qmRXsWMnKW6ws9/25c9zrzLDzqdlCQYroraFer4g+RYrRG7aiNUd63RR9kpSiawqL1moe6nXRh0kjHlhR7Dnakb67v8Cu2tYIbcqs/g722nt46bRlRa8AU3cr2hWhpTSvArvoBlVab4s+X+LxA7tftK2wMS3VN80DL25vb0xviz5rIlkLnqNpYo0K4+ubI9HHjZ9A4HkKlmUZHUIfZLrDQ4BVVTUMyyjfDggt+tyREw7smSedj8FnRts7NNhVW+qkc3tcyuA9Fg1MZEJb1oTQd9lSRwUvKm2pneuTLKHjgb32Lo8JnZF7LD7YvcfUKU2sO9GaAEkC7KKNxZgWTeInKfBXqcv3xxtd6ETBrnlaEo3iJWkwkXMHLgO8SQEYYIABBlg0iheAAQYYYIBFo3gBGGCAAQZYNIoXgAEGGGCARaN4ARhggAEGWDSKF4ABBhhggEWjeAEYYIABBliwqdLu7p4++PyzkWxg0+k+7O1vbW3t5gFM2MdTps0FWH/YO933tJKDK6bDsFvfIiu4Und6jz+x0oLNbm/33yqtlOB279EPKx14Pmj9rXKBvwbtmkgCrvR+Xcdyg829QFqAAQYYYIABBhhggAEGGGCANxicwMKeTIG3n3aqzzG3rWULvFOr1WaEPohe6qyBi0Uy98/OX57vopU6e2CWWq04eyV0hDVF2QS75v7s9ektrDmzYE/N2vstzLq1bIM99Gzn/S1oe2cfvCg0oYOs4ZICvPimz2hi5QbsVZqN6QvemJYK7KnpHvMvtHzgubmaL3CxCDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwzw6nR91w1LCvZ2LK83ywMucLZoywp243AX80oIplTma/9XquUEs9SX3jrIBZhiEvrnPSY12FXTxNqsdx7+GMxS7+0uLrJ8gAtsh7w7ph/zAi6wRwJoTG/AazypgbkBGGCAAQYYYLnB05yBrUl+wIZhWZPxwGdfo1xgQyWsNf04KfkuIpUHbFDUSefj5Ii7dFUSMLWxMe18HH+uXTwqBdiyVIbll1YOMLugLHU8+Ay8PDgguMbbaykKTG08Kd8PPkOthw4Apj9g+8UjbNoOnPBgNno6t4Obo7BLz9eA2V7xs/PqxV9qC2HB8xvqfnBTinIq/vbhPsMGugviJQSYvlmrc31zFLUEPmC2dLj/+n4RZpF4jIQAjwkb56dWgN1V8e9/3cbLCQq2ldgPcfwEU2FnO09va5doJ5sgYFtpaFfD2D/14xUA9ghAlJcPYmY92CbspdOO/1MLMPtoz84JG/MZk2jhg21Fa146ZjInY2Bv0KbcxsvhgLVW87Ke4E8ROI1BuyY+YK01PEyijZez/VJNa/Zw8htsK63moV4X8oGlkO9g225cjfS2rFiWLzDdT1rz0JHZOo8HpgtqJG8bL0dvsNEz0h1T9ElSit4aBqzsfw2lSZ9iE2euAAAAAElFTkSuQmCC",
      "status": 4,
      "created_time": 1628150400
    },
    {
      "id": 5,
      "company": {
        "id": 105,
        "name": "Tech Pioneers",
        "profile_image_url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAADSCAMAAABD772dAAAAw1BMVEX///95590uWrUAydM5jf+B6N/X+PUrWLTN1+1CaLv5/v72+v+Etf+M4+j0/f2wz/9v3eMwiv8iU7IAy9Tz+f/t+/p/6N6g7udy5tvI9fGW7OTw/Pvi6fVSdMClt96uvuHQ8/ZN1t3i+fq77vJlpv88kf+Yq9iPu//R5P+z8evN9vGa7eW78u1hgcaIoNS4x+Zwjcs3Yrnk6vVpiMhBZ7qi6eyI4+hl2uGdxf/c6/9Mmf+40/9zq//A2/+lyP97ls/I0uoYrnA8AAAEhklEQVR4nO3dbVeyQBAGYCEBtcKkVNIsw7QsrSzrKXv9/7/qmRXsWMnKW6ws9/25c9zrzLDzqdlCQYroraFer4g+RYrRG7aiNUd63RR9kpSiawqL1moe6nXRh0kjHlhR7Dnakb67v8Cu2tYIbcqs/g722nt46bRlRa8AU3cr2hWhpTSvArvoBlVab4s+X+LxA7tftK2wMS3VN80DL25vb0xviz5rIlkLnqNpYo0K4+ubI9HHjZ9A4HkKlmUZHUIfZLrDQ4BVVTUMyyjfDggt+tyREw7smSedj8FnRts7NNhVW+qkc3tcyuA9Fg1MZEJb1oTQd9lSRwUvKm2pneuTLKHjgb32Lo8JnZF7LD7YvcfUKU2sO9GaAEkC7KKNxZgWTeInKfBXqcv3xxtd6ETBrnlaEo3iJWkwkXMHLgO8SQEYYIABBlg0iheAAQYYYIBFo3gBGGCAAQZYNIoXgAEGGGCARaN4ARhggAEGWDSKF4ABBhhggEWjeAEYYIABBliwqdLu7p4++PyzkWxg0+k+7O1vbW3t5gFM2MdTps0FWH/YO933tJKDK6bDsFvfIiu4Und6jz+x0oLNbm/33yqtlOB279EPKx14Pmj9rXKBvwbtmkgCrvR+Xcdyg829QFqAAQYYYIABBhhggAEGGGCANxicwMKeTIG3n3aqzzG3rWULvFOr1WaEPohe6qyBi0Uy98/OX57vopU6e2CWWq04eyV0hDVF2QS75v7s9ektrDmzYE/N2vstzLq1bIM99Gzn/S1oe2cfvCg0oYOs4ZICvPimz2hi5QbsVZqN6QvemJYK7KnpHvMvtHzgubmaL3CxCDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwzw6nR91w1LCvZ2LK83ywMucLZoywp243AX80oIplTma/9XquUEs9SX3jrIBZhiEvrnPSY12FXTxNqsdx7+GMxS7+0uLrJ8gAtsh7w7ph/zAi6wRwJoTG/AazypgbkBGGCAAQYYYLnB05yBrUl+wIZhWZPxwGdfo1xgQyWsNf04KfkuIpUHbFDUSefj5Ii7dFUSMLWxMe18HH+uXTwqBdiyVIbll1YOMLugLHU8+Ay8PDgguMbbaykKTG08Kd8PPkOthw4Apj9g+8UjbNoOnPBgNno6t4Obo7BLz9eA2V7xs/PqxV9qC2HB8xvqfnBTinIq/vbhPsMGugviJQSYvlmrc31zFLUEPmC2dLj/+n4RZpF4jIQAjwkb56dWgN1V8e9/3cbLCQq2ldgPcfwEU2FnO09va5doJ5sgYFtpaFfD2D/14xUA9ghAlJcPYmY92CbspdOO/1MLMPtoz84JG/MZk2jhg21Fa146ZjInY2Bv0KbcxsvhgLVW87Ke4E8ROI1BuyY+YK01PEyijZez/VJNa/Zw8htsK63moV4X8oGlkO9g225cjfS2rFiWLzDdT1rz0JHZOo8HpgtqJG8bL0dvsNEz0h1T9ElSit4aBqzsfw2lSZ9iE2euAAAAAElFTkSuQmCC"
      },
      "location": {
        "id": 205,
        "country": "DE",
        "state": "",
        "city": "Berlin"
      },
      "position": {
        "id": 305,
        "title": "Product Manager",
        "level": "Senior"
      },
      "total_package": {
        "amount": 110000,
        "currency": "EUR"
      },
      "image_url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAADSCAMAAABD772dAAAAw1BMVEX///95590uWrUAydM5jf+B6N/X+PUrWLTN1+1CaLv5/v72+v+Etf+M4+j0/f2wz/9v3eMwiv8iU7IAy9Tz+f/t+/p/6N6g7udy5tvI9fGW7OTw/Pvi6fVSdMClt96uvuHQ8/ZN1t3i+fq77vJlpv88kf+Yq9iPu//R5P+z8evN9vGa7eW78u1hgcaIoNS4x+Zwjcs3Yrnk6vVpiMhBZ7qi6eyI4+hl2uGdxf/c6/9Mmf+40/9zq//A2/+lyP97ls/I0uoYrnA8AAAEhklEQVR4nO3dbVeyQBAGYCEBtcKkVNIsw7QsrSzrKXv9/7/qmRXsWMnKW6ws9/25c9zrzLDzqdlCQYroraFer4g+RYrRG7aiNUd63RR9kpSiawqL1moe6nXRh0kjHlhR7Dnakb67v8Cu2tYIbcqs/g722nt46bRlRa8AU3cr2hWhpTSvArvoBlVab4s+X+LxA7tftK2wMS3VN80DL25vb0xviz5rIlkLnqNpYo0K4+ubI9HHjZ9A4HkKlmUZHUIfZLrDQ4BVVTUMyyjfDggt+tyREw7smSedj8FnRts7NNhVW+qkc3tcyuA9Fg1MZEJb1oTQd9lSRwUvKm2pneuTLKHjgb32Lo8JnZF7LD7YvcfUKU2sO9GaAEkC7KKNxZgWTeInKfBXqcv3xxtd6ETBrnlaEo3iJWkwkXMHLgO8SQEYYIABBlg0iheAAQYYYIBFo3gBGGCAAQZYNIoXgAEGGGCARaN4ARhggAEGWDSKF4ABBhhggEWjeAEYYIABBliwqdLu7p4++PyzkWxg0+k+7O1vbW3t5gFM2MdTps0FWH/YO933tJKDK6bDsFvfIiu4Und6jz+x0oLNbm/33yqtlOB279EPKx14Pmj9rXKBvwbtmkgCrvR+Xcdyg829QFqAAQYYYIABBhhggAEGGGCANxicwMKeTIG3n3aqzzG3rWULvFOr1WaEPohe6qyBi0Uy98/OX57vopU6e2CWWq04eyV0hDVF2QS75v7s9ektrDmzYE/N2vstzLq1bIM99Gzn/S1oe2cfvCg0oYOs4ZICvPimz2hi5QbsVZqN6QvemJYK7KnpHvMvtHzgubmaL3CxCDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwzw6nR91w1LCvZ2LK83ywMucLZoywp243AX80oIplTma/9XquUEs9SX3jrIBZhiEvrnPSY12FXTxNqsdx7+GMxS7+0uLrJ8gAtsh7w7ph/zAi6wRwJoTG/AazypgbkBGGCAAQYYYLnB05yBrUl+wIZhWZPxwGdfo1xgQyWsNf04KfkuIpUHbFDUSefj5Ii7dFUSMLWxMe18HH+uXTwqBdiyVIbll1YOMLugLHU8+Ay8PDgguMbbaykKTG08Kd8PPkOthw4Apj9g+8UjbNoOnPBgNno6t4Obo7BLz9eA2V7xs/PqxV9qC2HB8xvqfnBTinIq/vbhPsMGugviJQSYvlmrc31zFLUEPmC2dLj/+n4RZpF4jIQAjwkb56dWgN1V8e9/3cbLCQq2ldgPcfwEU2FnO09va5doJ5sgYFtpaFfD2D/14xUA9ghAlJcPYmY92CbspdOO/1MLMPtoz84JG/MZk2jhg21Fa146ZjInY2Bv0KbcxsvhgLVW87Ke4E8ROI1BuyY+YK01PEyijZez/VJNa/Zw8htsK63moV4X8oGlkO9g225cjfS2rFiWLzDdT1rz0JHZOo8HpgtqJG8bL0dvsNEz0h1T9ElSit4aBqzsfw2lSZ9iE2euAAAAAElFTkSuQmCC",
      "status": 3,
      "created_time": 1628236800
    }
  ],
  "total_offer_count": 5
})