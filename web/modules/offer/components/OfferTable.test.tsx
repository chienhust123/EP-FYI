import { screen } from '@testing-library/react';
import OfferTable from './OfferTable';
import { Offer, OfferStatus, PositionLevel } from '@/services/offer';
import { renderApp } from '@/test/render';

describe('OfferTable', () => {
  const mockOffers: Offer[] = [
    {
      id: 1,
      company: {
        id: 101,
        name: 'Tech Innovators',
        profile_image_url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAADSCAMAAABD772dAAAAw1BMVEX///95590uWrUAydM5jf+B6N/X+PUrWLTN1+1CaLv5/v72+v+Etf+M4+j0/f2wz/9v3eMwiv8iU7IAy9Tz+f/t+/p/6N6g7udy5tvI9fGW7OTw/Pvi6fVSdMClt96uvuHQ8/ZN1t3i+fq77vJlpv88kf+Yq9iPu//R5P+z8evN9vGa7eW78u1hgcaIoNS4x+Zwjcs3Yrnk6vVpiMhBZ7qi6eyI4+hl2uGdxf/c6/9Mmf+40/9zq//A2/+lyP97ls/I0uoYrnA8AAAEhklEQVR4nO3dbVeyQBAGYCEBtcKkVNIsw7QsrSzrKXv9/7/qmRXsWMnKW6ws9/25c9zrzLDzqdlCQYroraFer4g+RYrRG7aiNUd63RR9kpSiawqL1moe6nXRh0kjHlhR7Dnakb67v8Cu2tYIbcqs/g722nt46bRlRa8AU3cr2hWhpTSvArvoBlVab4s+X+LxA7tftK2wMS3VN80DL25vb0xviz5rIlkLnqNpYo0K4+ubI9HHjZ9A4HkKlmUZHUIfZLrDQ4BVVTUMyyjfDggt+tyREw7smSedj8FnRts7NNhVW+qkc3tcyuA9Fg1MZEJb1oTQd9lSRwUvKm2pneuTLKHjgb32Lo8JnZF7LD7YvcfUKU2sO9GaAEkC7KKNxZgWTeInKfBXqcv3xxtd6ETBrnlaEo3iJWkwkXMHLgO8SQEYYIABBlg0iheAAQYYYIBFo3gBGGCAAQZYNIoXgAEGGGCARaN4ARhggAEGWDSKF4ABBhhggEWjeAEYYIABBliwqdLu7p4++PyzkWxg0+k+7O1vbW3t5gFM2MdTps0FWH/YO933tJKDK6bDsFvfIiu4Und6jz+x0oLNbm/33yqtlOB279EPKx14Pmj9rXKBvwbtmkgCrvR+Xcdyg829QFqAAQYYYIABBhhggAEGGGCANxicwMKeTIG3n3aqzzG3rWULvFOr1WaEPohe6qyBi0Uy98/OX57vopU6e2CWWq04eyV0hDVF2QS75v7s9ektrDmzYE/N2vstzLq1bIM99Gzn/S1oe2cfvCg0oYOs4ZICvPimz2hi5QbsVZqN6QvemJYK7KnpHvMvtHzgubmaL3CxCDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwzw6nR91w1LCvZ2LK83ywMucLZoywp243AX80oIplTma/9XquUEs9SX3jrIBZhiEvrnPSY12FXTxNqsdx7+GMxS7+0uLrJ8gAtsh7w7ph/zAi6wRwJoTG/AazypgbkBGGCAAQYYYLnB05yBrUl+wIZhWZPxwGdfo1xgQyWsNf04KfkuIpUHbFDUSefj5Ii7dFUSMLWxMe18HH+uXTwqBdiyVIbll1YOMLugLHU8+Ay8PDgguMbbaykKTG08Kd8PPkOthw4Apj9g+8UjbNoOnPBgNno6t4Obo7BLz9eA2V7xs/PqxV9qC2HB8xvqfnBTinIq/vbhPsMGugviJQSYvlmrc31zFLUEPmC2dLj/+n4RZpF4jIQAjwkb56dWgN1V8e9/3cbLCQq2ldgPcfwEU2FnO09va5doJ5sgYFtpaFfD2D/14xUA9ghAlJcPYmY92CbspdOO/1MLMPtoz84JG/MZk2jhg21Fa146ZjInY2Bv0KbcxsvhgLVW87Ke4E8ROI1BuyY+YK01PEyijZez/VJNa/Zw8htsK63moV4X8oGlkO9g225cjfS2rFiWLzDdT1rz0JHZOo8HpgtqJG8bL0dvsNEz0h1T9ElSit4aBqzsfw2lSZ9iE2euAAAAAElFTkSuQmCC',
      },
      location: {
        id: 201,
        country: 'US',
        state: 'CA',
        city: 'San Francisco',
      },
      position: {
        id: 301,
        title: 'Software Engineer',
        level: PositionLevel.VALUE_MIDDLE,
      },
      total_package: {
        amount: 120000,
        currency: 'USD',
      },
      image_url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAADSCAMAAABD772dAAAAw1BMVEX///95590uWrUAydM5jf+B6N/X+PUrWLTN1+1CaLv5/v72+v+Etf+M4+j0/f2wz/9v3eMwiv8iU7IAy9Tz+f/t+/p/6N6g7udy5tvI9fGW7OTw/Pvi6fVSdMClt96uvuHQ8/ZN1t3i+fq77vJlpv88kf+Yq9iPu//R5P+z8evN9vGa7eW78u1hgcaIoNS4x+Zwjcs3Yrnk6vVpiMhBZ7qi6eyI4+hl2uGdxf/c6/9Mmf+40/9zq//A2/+lyP97ls/I0uoYrnA8AAAEhklEQVR4nO3dbVeyQBAGYCEBtcKkVNIsw7QsrSzrKXv9/7/qmRXsWMnKW6ws9/25c9zrzLDzqdlCQYroraFer4g+RYrRG7aiNUd63RR9kpSiawqL1moe6nXRh0kjHlhR7Dnakb67v8Cu2tYIbcqs/g722nt46bRlRa8AU3cr2hWhpTSvArvoBlVab4s+X+LxA7tftK2wMS3VN80DL25vb0xviz5rIlkLnqNpYo0K4+ubI9HHjZ9A4HkKlmUZHUIfZLrDQ4BVVTUMyyjfDggt+tyREw7smSedj8FnRts7NNhVW+qkc3tcyuA9Fg1MZEJb1oTQd9lSRwUvKm2pneuTLKHjgb32Lo8JnZF7LD7YvcfUKU2sO9GaAEkC7KKNxZgWTeInKfBXqcv3xxtd6ETBrnlaEo3iJWkwkXMHLgO8SQEYYIABBlg0iheAAQYYYIBFo3gBGGCAAQZYNIoXgAEGGGCARaN4ARhggAEGWDSKF4ABBhhggEWjeAEYYIABBliwqdLu7p4++PyzkWxg0+k+7O1vbW3t5gFM2MdTps0FWH/YO933tJKDK6bDsFvfIiu4Und6jz+x0oLNbm/33yqtlOB279EPKx14Pmj9rXKBvwbtmkgCrvR+Xcdyg829QFqAAQYYYIABBhhggAEGGGCANxicwMKeTIG3n3aqzzG3rWULvFOr1WaEPohe6qyBi0Uy98/OX57vopU6e2CWWq04eyV0hDVF2QS75v7s9ektrDmzYE/N2vstzLq1bIM99Gzn/S1oe2cfvCg0oYOs4ZICvPimz2hi5QbsVZqN6QvemJYK7KnpHvMvtHzgubmaL3CxCDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwzw6nR91w1LCvZ2LK83ywMucLZoywp243AX80oIplTma/9XquUEs9SX3jrIBZhiEvrnPSY12FXTxNqsdx7+GMxS7+0uLrJ8gAtsh7w7ph/zAi6wRwJoTG/AazypgbkBGGCAAQYYYLnB05yBrUl+wIZhWZPxwGdfo1xgQyWsNf04KfkuIpUHbFDUSefj5Ii7dFUSMLWxMe18HH+uXTwqBdiyVIbll1YOMLugLHU8+Ay8PDgguMbbaykKTG08Kd8PPkOthw4Apj9g+8UjbNoOnPBgNno6t4Obo7BLz9eA2V7xs/PqxV9qC2HB8xvqfnBTinIq/vbhPsMGugviJQSYvlmrc31zFLUEPmC2dLj/+n4RZpF4jIQAjwkb56dWgN1V8e9/3cbLCQq2ldgPcfwEU2FnO09va5doJ5sgYFtpaFfD2D/14xUA9ghAlJcPYmY92CbspdOO/1MLMPtoz84JG/MZk2jhg21Fa146ZjInY2Bv0KbcxsvhgLVW87Ke4E8ROI1BuyY+YK01PEyijZez/VJNa/Zw8htsK63moV4X8oGlkO9g225cjfS2rFiWLzDdT1rz0JHZOo8HpgtqJG8bL0dvsNEz0h1T9ElSit4aBqzsfw2lSZ9iE2euAAAAAElFTkSuQmCC',
      status: 1,
      created_time: 1627891200,
    },
    {
      id: 2,
      company: {
        id: 102,
        name: 'Global Finance',
        profile_image_url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAADSCAMAAABD772dAAAAw1BMVEX///95590uWrUAydM5jf+B6N/X+PUrWLTN1+1CaLv5/v72+v+Etf+M4+j0/f2wz/9v3eMwiv8iU7IAy9Tz+f/t+/p/6N6g7udy5tvI9fGW7OTw/Pvi6fVSdMClt96uvuHQ8/ZN1t3i+fq77vJlpv88kf+Yq9iPu//R5P+z8evN9vGa7eW78u1hgcaIoNS4x+Zwjcs3Yrnk6vVpiMhBZ7qi6eyI4+hl2uGdxf/c6/9Mmf+40/9zq//A2/+lyP97ls/I0uoYrnA8AAAEhklEQVR4nO3dbVeyQBAGYCEBtcKkVNIsw7QsrSzrKXv9/7/qmRXsWMnKW6ws9/25c9zrzLDzqdlCQYroraFer4g+RYrRG7aiNUd63RR9kpSiawqL1moe6nXRh0kjHlhR7Dnakb67v8Cu2tYIbcqs/g722nt46bRlRa8AU3cr2hWhpTSvArvoBlVab4s+X+LxA7tftK2wMS3VN80DL25vb0xviz5rIlkLnqNpYo0K4+ubI9HHjZ9A4HkKlmUZHUIfZLrDQ4BVVTUMyyjfDggt+tyREw7smSedj8FnRts7NNhVW+qkc3tcyuA9Fg1MZEJb1oTQd9lSRwUvKm2pneuTLKHjgb32Lo8JnZF7LD7YvcfUKU2sO9GaAEkC7KKNxZgWTeInKfBXqcv3xxtd6ETBrnlaEo3iJWkwkXMHLgO8SQEYYIABBlg0iheAAQYYYIBFo3gBGGCAAQZYNIoXgAEGGGCARaN4ARhggAEGWDSKF4ABBhhggEWjeAEYYIABBliwqdLu7p4++PyzkWxg0+k+7O1vbW3t5gFM2MdTps0FWH/YO933tJKDK6bDsFvfIiu4Und6jz+x0oLNbm/33yqtlOB279EPKx14Pmj9rXKBvwbtmkgCrvR+Xcdyg829QFqAAQYYYIABBhhggAEGGGCANxicwMKeTIG3n3aqzzG3rWULvFOr1WaEPohe6qyBi0Uy98/OX57vopU6e2CWWq04eyV0hDVF2QS75v7s9ektrDmzYE/N2vstzLq1bIM99Gzn/S1oe2cfvCg0oYOs4ZICvPimz2hi5QbsVZqN6QvemJYK7KnpHvMvtHzgubmaL3CxCDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwzw6nR91w1LCvZ2LK83ywMucLZoywp243AX80oIplTma/9XquUEs9SX3jrIBZhiEvrnPSY12FXTxNqsdx7+GMxS7+0uLrJ8gAtsh7w7ph/zAi6wRwJoTG/AazypgbkBGGCAAQYYYLnB05yBrUl+wIZhWZPxwGdfo1xgQyWsNf04KfkuIpUHbFDUSefj5Ii7dFUSMLWxMe18HH+uXTwqBdiyVIbll1YOMLugLHU8+Ay8PDgguMbbaykKTG08Kd8PPkOthw4Apj9g+8UjbNoOnPBgNno6t4Obo7BLz9eA2V7xs/PqxV9qC2HB8xvqfnBTinIq/vbhPsMGugviJQSYvlmrc31zFLUEPmC2dLj/+n4RZpF4jIQAjwkb56dWgN1V8e9/3cbLCQq2ldgPcfwEU2FnO09va5doJ5sgYFtpaFfD2D/14xUA9ghAlJcPYmY92CbspdOO/1MLMPtoz84JG/MZk2jhg21Fa146ZjInY2Bv0KbcxsvhgLVW87Ke4E8ROI1BuyY+YK01PEyijZez/VJNa/Zw8htsK63moV4X8oGlkO9g225cjfS2rFiWLzDdT1rz0JHZOo8HpgtqJG8bL0dvsNEz0h1T9ElSit4aBqzsfw2lSZ9iE2euAAAAAElFTkSuQmCC',
      },
      location: {
        id: 202,
        country: 'GB',
        state: '',
        city: 'London',
      },
      position: {
        id: 302,
        title: 'Financial Analyst',
        level: PositionLevel.VALUE_PRINCIPAL,
      },
      total_package: {
        amount: 70000,
        currency: 'GBP',
      },
      image_url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAADSCAMAAABD772dAAAAw1BMVEX///95590uWrUAydM5jf+B6N/X+PUrWLTN1+1CaLv5/v72+v+Etf+M4+j0/f2wz/9v3eMwiv8iU7IAy9Tz+f/t+/p/6N6g7udy5tvI9fGW7OTw/Pvi6fVSdMClt96uvuHQ8/ZN1t3i+fq77vJlpv88kf+Yq9iPu//R5P+z8evN9vGa7eW78u1hgcaIoNS4x+Zwjcs3Yrnk6vVpiMhBZ7qi6eyI4+hl2uGdxf/c6/9Mmf+40/9zq//A2/+lyP97ls/I0uoYrnA8AAAEhklEQVR4nO3dbVeyQBAGYCEBtcKkVNIsw7QsrSzrKXv9/7/qmRXsWMnKW6ws9/25c9zrzLDzqdlCQYroraFer4g+RYrRG7aiNUd63RR9kpSiawqL1moe6nXRh0kjHlhR7Dnakb67v8Cu2tYIbcqs/g722nt46bRlRa8AU3cr2hWhpTSvArvoBlVab4s+X+LxA7tftK2wMS3VN80DL25vb0xviz5rIlkLnqNpYo0K4+ubI9HHjZ9A4HkKlmUZHUIfZLrDQ4BVVTUMyyjfDggt+tyREw7smSedj8FnRts7NNhVW+qkc3tcyuA9Fg1MZEJb1oTQd9lSRwUvKm2pneuTLKHjgb32Lo8JnZF7LD7YvcfUKU2sO9GaAEkC7KKNxZgWTeInKfBXqcv3xxtd6ETBrnlaEo3iJWkwkXMHLgO8SQEYYIABBlg0iheAAQYYYIBFo3gBGGCAAQZYNIoXgAEGGGCARaN4ARhggAEGWDSKF4ABBhhggEWjeAEYYIABBliwqdLu7p4++PyzkWxg0+k+7O1vbW3t5gFM2MdTps0FWH/YO933tJKDK6bDsFvfIiu4Und6jz+x0oLNbm/33yqtlOB279EPKx14Pmj9rXKBvwbtmkgCrvR+Xcdyg829QFqAAQYYYIABBhhggAEGGGCANxicwMKeTIG3n3aqzzG3rWULvFOr1WaEPohe6qyBi0Uy98/OX57vopU6e2CWWq04eyV0hDVF2QS75v7s9ektrDmzYE/N2vstzLq1bIM99Gzn/S1oe2cfvCg0oYOs4ZICvPimz2hi5QbsVZqN6QvemJYK7KnpHvMvtHzgubmaL3CxCDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwzw6nR91w1LCvZ2LK83ywMucLZoywp243AX80oIplTma/9XquUEs9SX3jrIBZhiEvrnPSY12FXTxNqsdx7+GMxS7+0uLrJ8gAtsh7w7ph/zAi6wRwJoTG/AazypgbkBGGCAAQYYYLnB05yBrUl+wIZhWZPxwGdfo1xgQyWsNf04KfkuIpUHbFDUSefj5Ii7dFUSMLWxMe18HH+uXTwqBdiyVIbll1YOMLugLHU8+Ay8PDgguMbbaykKTG08Kd8PPkOthw4Apj9g+8UjbNoOnPBgNno6t4Obo7BLz9eA2V7xs/PqxV9qC2HB8xvqfnBTinIq/vbhPsMGugviJQSYvlmrc31zFLUEPmC2dLj/+n4RZpF4jIQAjwkb56dWgN1V8e9/3cbLCQq2ldgPcfwEU2FnO09va5doJ5sgYFtpaFfD2D/14xUA9ghAlJcPYmY92CbspdOO/1MLMPtoz84JG/MZk2jhg21Fa146ZjInY2Bv0KbcxsvhgLVW87Ke4E8ROI1BuyY+YK01PEyijZez/VJNa/Zw8htsK63moV4X8oGlkO9g225cjfS2rFiWLzDdT1rz0JHZOo8HpgtqJG8bL0dvsNEz0h1T9ElSit4aBqzsfw2lSZ9iE2euAAAAAElFTkSuQmCC',
      status: 2,
      created_time: 1627977600,
    },
  ];

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('#rendering', () => {
    it('renders the table with offer data', async () => {
      renderApp(<OfferTable offerList={mockOffers} />);

      expect(screen.getByRole('table')).toMatchSnapshot();
    });

    it('renders a message when offerList is empty', async () => {
      renderApp(<OfferTable offerList={[]} />);

      expect(screen.getByText('No offers available')).toBeInTheDocument();
    });
  });

  describe('#error-handling', () => {
    it('displays "N/A" if OfferStatusMap key is missing', async () => {
      renderApp(<OfferTable offerList={[{ ...mockOffers[0], status: 'unknown' as unknown as OfferStatus }]} />);

      expect(screen.getByText('NA')).toBeInTheDocument();
    });
  });
});
