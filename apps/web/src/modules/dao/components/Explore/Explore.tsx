import { useRouter } from 'next/router'
import React from 'react'
import Image from 'next/legacy/image'
import { getFetchableUrl } from 'ipfs-service'
import Pagination from 'src/components/Pagination'
import { ExploreDaosResponse } from 'src/data/subgraph/requests/daolistQuery'
import { useChainStore } from 'src/stores/useChainStore'
import HtmlReactParser from 'html-react-parser'
import { ScaleLoader } from 'react-spinners';
import {
  centeredContainer,
  flexCenterStyle,
  imgContainer,
  SmtextStyle,
  textContainer,
  container,
  columnStyle,
  columnsStyle,
  containerStyle, 
  cellStyle, 
  tableStyle,
  headerCellStyle
} from './style.css';
import Link from 'next/link';

interface ExploreProps extends Partial<ExploreDaosResponse> {
  isLoading: boolean
  hasNextPage: boolean
}


export const Explore: React.FC<ExploreProps> = ({ daos, hasNextPage, isLoading }) => {
  const router = useRouter()
  const { pathname } = router
  const chain = useChainStore((x) => x.chain)

  const page = router.query.page

  const handlePageBack = React.useCallback(() => {
    // user is on the first page
    if (!page)
      return {
        pathname,
        query: {
          ...router.query,
        },
      }

    // user is at least on the second page
    return Number(page) > 2
      ? {
          pathname,
          query: {
            ...router.query,
            page: Number(page) - 1,
          },
        }
      : {
          pathname,
        }
  }, [router, pathname])

  const handlePageForward = React.useCallback(() => {
    // there are no more results to be fetched
    if (!hasNextPage)
      return {
        pathname,
        query: {
          page,
        },
      }

    // user is on the first page
    if (!page)
      return {
        pathname,
        query: {
          ...router.query,
          page: 2,
        },
      }

    // user is at least on the second page
    return {
      pathname,
      query: {
        ...router.query,
        page: Number(page) + 1,
      },
    }
  }, [router, daos?.length, pathname])

  return (
  <div>
     <div className={flexCenterStyle} > Top DAOs on {chain.name} By Total Auction Sales </div>
       
       <div className={containerStyle} >
  <table className={tableStyle}>
      <thead className={headerCellStyle}>
          <tr>
              <th scope="col" className={cellStyle}>
                DAO
              </th>
              <th scope="col" className={headerCellStyle}>
                DAO Description
              </th>
              <th scope="col" className={headerCellStyle}>
                Total Owners
              </th>
              <th scope="col" className={headerCellStyle}>
                Total Supply
              </th>
              <th scope="col" className={headerCellStyle}>
              Total Auction Sales
              </th>
          </tr>
      </thead>
      {isLoading ? (
        <div className={centeredContainer}>
        <div>
          <ScaleLoader /> Loading...
        </div>
      </div>
      ) : ( 
      <tbody>
      
      {daos?.map((dao, index) => (
        
        
          <tr key={index} className={columnsStyle}>
              <th scope="row" className={columnStyle}>
              <Link href={`https://nouns.build/dao/${chain.slug}/${dao.dao?.tokenAddress}`} target="_blank" passHref>
              <div className={container}>
                
      <div className={imgContainer}>
          <Image
            src={getFetchableUrl(dao.dao?.contractImage) || 'N/A'}
            alt={dao.dao?.name}
            layout="fixed"
            objectFit="contain"
            width={50}
            height={50}
            style={{ borderRadius: '50%' }}
          />
        
      </div>
      
      <div
        style={{
          cursor: 'pointer',
        }}
      >
        <div className={textContainer}>{dao.dao?.name ?? 'N/A'}</div>
        <div className={SmtextStyle}>{dao.dao?.tokenAddress ?? 'N/A'}</div>
        <div className={SmtextStyle}>{dao.dao?.symbol ?? 'N/A'}</div>
      </div>
      
    </div>
    </Link>
              </th>
              <td className={textContainer} >
              {dao.dao?.description && HtmlReactParser(dao.dao.description.replace(/\\n/g, '').replace(/_+/g, ''))}
              </td>
              <td  >
              {dao.dao.ownerCount ?? undefined}
              </td>
              <td >
              {dao.dao.totalSupply ?? undefined}
              </td>
              <td className="px-6 py-4">
              <span className="bg-green-400 text-gray-50 rounded-md px-2">{(dao.dao.totalAuctionSales / 1000000000000000000)?.toFixed(4) ?? 'N/A'} ETH</span>
              </td>
          </tr>
           ))}
      </tbody>
      )}
  </table>

  </div>
          <Pagination
            onNext={handlePageForward}
            onPrev={handlePageBack}
            isLast={!hasNextPage}
            isFirst={!router.query.page}
            scroll={true}
          />
        </div>
        );
}