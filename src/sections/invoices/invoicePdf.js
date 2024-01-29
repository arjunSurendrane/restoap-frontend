/* eslint-disable jsx-a11y/alt-text */
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-unresolved
import { Page, View, Text, Image, Document } from '@react-pdf/renderer';
// utils
// import { fDate } from '../../../../utils/formatTime';
// import { fCurrency } from '../../../../utils/formatNumber';
//
import { useLocation } from 'react-router';
import moment from 'moment';
import styles from './invoiceStyle';

// ----------------------------------------------------------------------
InvoicePDF.propTypes = {
  data: PropTypes.object,
};

export default function InvoicePDF({ data }) {
  //   const {
  //     items,
  //     taxes,
  //     status,
  //     dueDate,
  //     discount,
  //     invoiceTo,
  //     createDate,
  //     totalPrice,
  //     invoiceFrom,
  //     invoiceNumber,
  //     subTotalPrice,
  //   } = invoice;
  console.log('styles.page', styles);

  console.log('data  inside pdf', data);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={[styles.gridContainer, styles.mb40]}>
          <Image source="/logo/logo_single.png" style={{ height: 32 }} />
          <View style={{ alignItems: 'flex-end', flexDirection: 'column' }}>
            <Text style={styles.h3}>{data.status}</Text>
            <Text>{data.number} </Text>
          </View>
        </View>

        <View style={[styles.gridContainer, styles.mb40]}>
          <View style={styles.col6}>
            <Text style={[styles.overline, styles.mb8]}>Invoice from</Text>
            <Text style={styles.body1}>RestoAp</Text>
            <Text style={styles.body1}>First Floor, Adamstar Building, Kakkanad</Text>
            <Text style={styles.body1}>Phone: 95447 77388</Text>
          </View>

          <View style={styles.col6}>
            <Text style={[styles.overline, styles.mb8]}>Invoice to</Text>
            <Text style={styles.body1}>{data.email}</Text>
            {/* <Text style={styles.body1}>
              {' '}
              Seaport Airport Road, Kakkanad, Kochi (Cochin) 682037 India
            </Text> */}
            {/* <Text style={styles.body1}>Phone: +91 484 297 2974</Text> */}
          </View>
        </View>

        <View style={[styles.gridContainer, styles.mb40]}>
          <View style={styles.col6}>
            <Text style={[styles.overline, styles.mb8]}>Date create</Text>
            <Text style={styles.body1}>
              {moment(new Date(data.createdAt * 1000)).format('MMM DD YYYY')}
            </Text>
          </View>
          <View style={styles.col6}>
            <Text style={[styles.overline, styles.mb8]}>Due date</Text>
            <Text style={styles.body1}>
              {moment(new Date(data.dueDate * 1000)).format('MMM DD YYYY')}
            </Text>
          </View>
        </View>

        <Text style={[styles.overline, styles.mb8]}>Invoice Details</Text>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <View style={styles.tableRow}>
              <View style={styles.tableCell_1}>
                <Text style={styles.subtitle2}>#</Text>
              </View>

              <View style={styles.tableCell_2}>
                <Text style={styles.subtitle2}>Description</Text>
              </View>

              <View style={styles.tableCell_3}>
                <Text style={styles.subtitle2}>Qty</Text>
              </View>

              <View style={styles.tableCell_3}>
                <Text style={styles.subtitle2}>Unit price</Text>
              </View>

              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text style={styles.subtitle2}>Total</Text>
              </View>
            </View>
          </View>

          <View style={styles.tableBody}>
            {/* {items.map((item, index) => ( */}
            <View
              style={styles.tableRow}
              //  key={item.id}
            >
              <View style={styles.tableCell_1}>
                <Text>{data.index + 1}</Text>
              </View>

              <View style={styles.tableCell_2}>
                <Text style={styles.subtitle2}>
                  {data.plan} ({data.planInterval}ly)
                </Text>
                {/* <Text>{item.description}</Text> */}
              </View>

              <View style={styles.tableCell_3}>
                <Text>{data?.quantity}</Text>
              </View>

              <View style={styles.tableCell_3}>
                <Text>{data.unitPrice / 100}</Text>
              </View>

              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text>{data.quantity * (data.unitPrice / 100)}</Text>
              </View>
            </View>
            {/* ))} */}

            <View style={[styles.tableRow, styles.noBorder]}>
              <View style={styles.tableCell_1} />
              <View style={styles.tableCell_2} />
              <View style={styles.tableCell_3} />
              <View style={styles.tableCell_3}>
                <Text>Subtotal</Text>
              </View>
              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text>{data.subTotal / 100} </Text>
              </View>
            </View>
            {!data?.discounts?.length === 0 && (
              <View style={[styles.tableRow, styles.noBorder]}>
                <View style={styles.tableCell_1} />
                <View style={styles.tableCell_2} />
                <View style={styles.tableCell_3} />
                <View style={styles.tableCell_3}>
                  <Text>Discount</Text>
                </View>
                <View style={[styles.tableCell_3, styles.alignRight]}>
                  <Text> {data.discounts}</Text>
                </View>
              </View>
            )}
            {!data?.tax?.length === 0 && (
              <View style={[styles.tableRow, styles.noBorder]}>
                <View style={styles.tableCell_1} />
                <View style={styles.tableCell_2} />
                <View style={styles.tableCell_3} />
                <View style={styles.tableCell_3}>
                  <Text>Taxes</Text>
                </View>
                <View style={[styles.tableCell_3, styles.alignRight]}>
                  <Text>{data.tax}</Text>
                </View>
              </View>
            )}

            <View style={[styles.tableRow, styles.noBorder]}>
              <View style={styles.tableCell_1} />
              <View style={styles.tableCell_2} />
              <View style={styles.tableCell_3} />
              <View style={styles.tableCell_3}>
                <Text style={styles.h4}>Total</Text>
              </View>
              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text style={styles.h4}> {data.total / 100}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={[styles.gridContainer, styles.footer]}>
          <View style={styles.col8}>
            <Text style={styles.subtitle2}>NOTES</Text>
            <Text>
              We appreciate your business. Should you need us to add VAT or extra notes let us know!
            </Text>
          </View>
          <View style={[styles.col4, styles.alignRight]}>
            <Text style={styles.subtitle2}>Have a Question?</Text>
            <Text>info@restoap.com</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
