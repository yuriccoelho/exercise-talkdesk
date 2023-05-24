"use client"

import Row from '@/components/Row/Row';
import Dropdown from '@/components/Dropdown/Dropdown';
import Grid from '@/components/Grid/Grid';
import Pagination from '@/components/Pagination/Pagination';
import Card, { CardProps } from '@/components/Card/Card';
import { useEffect, useState } from 'react';
import { relative } from 'path';

export default function Home() {

  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');   
  
    const [currentPage, setCurrentPage] = useState(1);
    const [cardList, setCardList] = useState([]);
  
    const loadCards = async () => {
      
      //Body of the fetch requisition
      var raw = JSON.stringify({
        category: [],
        industry: "all-industries",
        integration: 'all-integrations',
        limit: 20,
        order: 'ASC',
        order_by: 'title',
        page: currentPage,
        post_type: ['customers'],
        region: 'all-regions',
        search: '',
      });
  
      const requestOptions:RequestInit = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };  
      
      try {
        const response = await fetch(
          'https://cms.talkdesk.com/wp-json/web-api/v1/content/cards',
          requestOptions
        );
          
        const result = await response.json();
        
        setCardList(result?.data?.list ?? []);
  
      } catch (error) {
        console.log('error', error)
      }
    };
  
    useEffect(()=>{
      loadCards().catch(console.error);
    },[]);
  
    useEffect(()=>{
      loadCards().catch(console.error);
    },[currentPage]);
  
    const renderCardList = () => {
      return cardList.map((card:CardProps) => <Card {...card} />);
    };

  return (
    <div className="App">
      <header className="App-header">
        <h2>
          The most innovative companies use Talkdesk.
        </h2>
        <p>
          See how companies around the world use Talkdesk to provide exceptional customer experiences.
        </p>
      </header>
      
      <div style={{ paddingBlock: '25px' }}></div>

      <section>
        <Row>
          <Dropdown />
          <Dropdown />
          <Dropdown />
        </Row>
      </section>

      <div style={{ paddingBlock: '15px' }}></div>

      <section>
        <Grid>
          {renderCardList()}
        </Grid>
      </section>

      <div style={{ paddingBlock: '25px' }}></div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={100}
          pageSize={16}
          onPageChange={page => setCurrentPage(page)}
        />
      </div>

      <div style={{ paddingBlock: '25px' }}></div>
    </div>
  );
}
