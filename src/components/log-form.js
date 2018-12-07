// import React from 'react'; 
// import {connect} from 'react-redux'; 
// import { TeaLog } from './tea-log';

// export function TeaLogForm(props) {

//   return (
//     <div className="log-form-wrapper"> 
//     <form className="log-form" onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
//         <label><h2>Rate your brew:</h2></label>
//         <field 
//         name="rate" 
//         id="rate" 
//         type="select" 
//         component="select"
//         >
//           <option value="5">
//             5 stars, best tea yet
//           </option>
//           <option value="4">
//             4 stars, very good tea
//           </option>
//           <option value="3">
//             3 stars, pretty good tea
//           </option>
//           <option value="2">
//             2 stars, not great and not terrible
//           </option>
//           <option value="1">
//             1 star, terrible tea
//           </option>
//         </field>
//         <label><h2>Notes about your brew:</h2></label>
//         <field name="description" type="text" id="description" component="input"/>
//         <br></br>
//         <button type="submit disabled={this.props.pristine || this.props.submitting}">Save your tea log</button>
//       </form> 
//     </div>
//     );
// }

// export default function(TeaLogForm)