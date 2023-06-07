import numpy as np
import pandas as pd

import sqlalchemy
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from sqlalchemy import create_engine, Table, Column, Integer, Numeric, String, MetaData
from config import db_password

from flask import Flask, jsonify, render_template


# 1. Database Setup

# localserver, the connection string
db_string = f"postgresql://postgres:{db_password}@127.0.0.1:5432/Drops_of_Jupyter"
# create the database engine
engine = create_engine(db_string)

# define a metadata obj. that describes the structure of your postgresql db
metadata = MetaData()
Individual = Table('individual', metadata,
    Column('ID', Integer, primary_key=True),
    Column('Region', String),
    Column('Age', Integer),
    Column('Gender', String),
    Column('Education', String),
    Column('Race', String),
    Column('Poverty_Ratio', Numeric(precision=2, scale=2))
)


# 2. Flask Setup
app = Flask(__name__)


# 3. Flask Routes

@app.route("/")
def welcome():
    """List all available api routes."""
    print("hello0")
    return render_template('index.html')


@app.route("/api/v1.0/ind")
def ind():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    # Query all indvidual
    results = session.query(Individual).all()
    session.close()
    
    df = pd.DataFrame([r._mapping for r in results])
    # print(df)

    # all = df.iloc[0:10].reset_index().to_dict(orient='list')
    all = df.reset_index().to_dict(orient='list')

    # print("hello1")
    # print(all)

    return( jsonify(all) )


@app.route("/api/v1.0/edu")
def edu():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    # Query all indvidual
    results2 = session.query(Individual).all()
    session.close()
    
    df = pd.DataFrame([r._mapping for r in results2])
    
    result_gender = {}
    result_gender['Male'] = df[df['Gender']=='Male'].groupby(['Education'])['ID'].count().to_dict()
    result_gender['Female'] = df[df['Gender']=='Female'].groupby(['Education'])['ID'].count().to_dict()
    
    print('hello3')
    print(result_gender)

    return( jsonify(result_gender)) 

# 4. run flask
if __name__ == '__main__':
    app.run(debug=False)
