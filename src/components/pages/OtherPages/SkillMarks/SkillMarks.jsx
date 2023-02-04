import React, { PureComponent } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const data = [
  {
    subject: 'React JS',
    marks: 80,
    out_of : 100 , 
    years: 2,
  },
  {
    subject: 'JavaScript',
    marks: 86,
    out_of : 100 , 
    years: 3,
  },
  {
    subject: 'Node JS',
    marks: 67,
    out_of : 100 , 
    years: 2,
  },
  {
    subject: 'MongoDB',
    marks: 65,
    out_of : 100 , 
    years: 2,
  },
  {
    subject: 'Bootstrap',
    marks: 90,
    out_of : 100 , 
    years: 4,
  },
  {
    subject: 'PHP',
    marks: 81,
    out_of : 100 , 
    years: 3,
  },
  {
    subject: 'MYSQL',
    marks: 81,
    out_of : 100 , 
    years: 3,
  },
];

export default class SkillMarks extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/composed-chart-in-responsive-container-pkqmy';

  render() {
    return (
      <div className=' my-5' style={{ width: '100%', height: 300 }}>
        <h2 className='text-center fs-2 fw-bolder text-uppercase my-2'> Skill marks </h2>
        <ResponsiveContainer>
          <ComposedChart
            width={500}
            height={400}
            data={data}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="subject" scale="band" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="subject" fill="#8884d8" stroke="#8884d8" />
            <Bar dataKey="marks" barSize={20} fill="#413ea0" />
            <Line type="monotone" dataKey="years" stroke="#ff7300" />
            <Line type="monotone" dataKey="out_of" stroke="#ff7300" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
