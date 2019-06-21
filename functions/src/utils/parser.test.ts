import parser from './parser';

const test = `<div class="widget-table-wrapper">
<table class="widget-table table" cellspacing="0" cellpadding="0" width="100%">
  <thead>
    <tr>
      <th colspan="2">{{message.currency}}</th>
      <th>{{message.buying}}</th>
      <th>{{message.selling}}</th>
    </tr>
  </thead>
  <tbody>
  

            <tr>
              <td class="flag-cell">
                <img class="flag-control" ng-src="{{getPAthValue('USD')}}" />
              </td>
              <td class="cur-cell">
                <span class="cur">
                  USD
                </span>
              </td>
              <td>30.84</td>
              <td>30.87</td>
            </tr>

            <tr>
              <td class="flag-cell">
                <img class="flag-control" ng-src="{{getPAthValue('EUR')}}" />
              </td>
              <td class="cur-cell">
                <span class="cur">
                  EUR
                </span>
              </td>
              <td>34.84</td>
              <td>34.88</td>
            </tr>

            <tr>
              <td class="flag-cell">
                <img class="flag-control" ng-src="{{getPAthValue('JPY')}}" />
              </td>
              <td class="cur-cell">
                <span class="cur">
                  JPY
                </span>
              </td>
              <td>0.2880</td>
              <td>0.2884</td>
            </tr>

            <tr>
              <td class="flag-cell">
                <img class="flag-control" ng-src="{{getPAthValue('AUD')}}" />
              </td>
              <td class="cur-cell">
                <span class="cur">
                  AUD
                </span>
              </td>
              <td>21.37</td>
              <td>21.41</td>
            </tr>

            <tr>
              <td class="flag-cell">
                <img class="flag-control" ng-src="{{getPAthValue('CAD')}}" />
              </td>
              <td class="cur-cell">
                <span class="cur">
                  CAD
                </span>
              </td>
              <td>23.40</td>
              <td>23.44</td>
            </tr>

            <tr>
              <td class="flag-cell">
                <img class="flag-control" ng-src="{{getPAthValue('CHF')}}" />
              </td>
              <td class="cur-cell">
                <span class="cur">
                  CHF
                </span>
              </td>
              <td>31.40</td>
              <td>31.44</td>
            </tr>

            <tr>
              <td class="flag-cell">
                <img class="flag-control" ng-src="{{getPAthValue('CNY')}}" />
              </td>
              <td class="cur-cell">
                <span class="cur">
                  CNY
                </span>
              </td>
              <td>4.484</td>
              <td>4.494</td>
            </tr>

            <tr>
              <td class="flag-cell">
                <img class="flag-control" ng-src="{{getPAthValue('GBP')}}" />
              </td>
              <td class="cur-cell">
                <span class="cur">
                  GBP
                </span>
              </td>
              <td>39.21</td>
              <td>39.25</td>
            </tr>

            <tr>
              <td class="flag-cell">
                <img class="flag-control" ng-src="{{getPAthValue('HKD')}}" />
              </td>
              <td class="cur-cell">
                <span class="cur">
                  HKD
                </span>
              </td>
              <td>3.96</td>
              <td>3.97</td>
            </tr>

            <tr>
              <td class="flag-cell">
                <img class="flag-control" ng-src="{{getPAthValue('NZD')}}" />
              </td>
              <td class="cur-cell">
                <span class="cur">
                  NZD
                </span>
              </td>
              <td>20.35</td>
              <td>20.39</td>
            </tr>

            <tr>
              <td class="flag-cell">
                <img class="flag-control" ng-src="{{getPAthValue('SGD')}}" />
              </td>
              <td class="cur-cell">
                <span class="cur">
                  SGD
                </span>
              </td>
              <td>22.74</td>
              <td>22.78</td>
            </tr>

  
  </tbody>
</table>

<div class="footer-table">
     <span class="update">{{message.lastUpdated}} 21/06/2019 12:11 </span>
     <span class="disclaimer">{{message.disclaimerTravel}}</span>
    </div>
</div>`;

describe('KTB TravelCard Parser', () => {
  it('should parse it completely and successfully', () => {
    expect(parser(test)).toEqual([
      { currency: 'USD', buying: 30.84, selling: 30.87 },
      { currency: 'EUR', buying: 34.84, selling: 34.88 },
      { currency: 'JPY', buying: 0.2880, selling: 0.2884 },
      { currency: 'AUD', buying: 21.37, selling: 21.41 },
      { currency: 'CAD', buying: 23.40, selling: 23.44 },
      { currency: 'CHF', buying: 31.40, selling: 31.44 },
      { currency: 'CNY', buying: 4.484, selling: 4.494 },
      { currency: 'GBP', buying: 39.21, selling: 39.25 },
      { currency: 'HKD', buying: 3.96, selling: 3.97 },
      { currency: 'NZD', buying: 20.35, selling: 20.39 },
      { currency: 'SGD', buying: 22.74, selling: 22.78 },
    ]);
  });

  it('should throw error when no params passing', () => {
    expect(() => parser()).toThrowError('Missing params: Response String is required');
  });
});
