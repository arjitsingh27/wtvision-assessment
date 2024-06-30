"use client"

import { useEffect, useState } from "react"
import useApi from "../hooks/useApi"
import styles from '../styles/ItemList.module.scss'

const ItemList = () => {
    const [dataList, setDataList] = useState([])
    const { apiCall } = useApi()


    const fectchList = async () => {
        let options = {
            method: "GET",
            headers: {
                'Content-Type': "application/json"
            }
        }
        const jsonList = await apiCall('/api/list', options)
        setDataList([...jsonList])
    }

    const makeCapitalise = (item) => {
        return item?.replaceAll('_', ' ').split(' ').map((str) => str[0].toUpperCase() + str.slice(1)).join(' ')
    }

    const renderValue = (data) => {
        if (typeof data === 'object' && !Array.isArray(data)) {
            return Object.keys(data).map((key) => (
                <div key={key}>
                    <div className={styles.objectKey}>{makeCapitalise(key)}</div>
                    <div>{renderValue(data[key])}</div>
                </div>
            ));
        } else if (Array.isArray(data)) {
            return data.map((item, index) => (
                <div key={index}>{renderValue(item)}</div>
            ));
        } else {
            return <div className={styles.content}>{data}</div>;
        }
    };

    const fetchValue = (obj) => {
        return renderValue(JSON.parse(obj));
    };

    useEffect(() => {
        fectchList()
    }, [])

    return <div className={styles.itemlist}>
        <h1 className={styles.heading}>Welcome To WTVision</h1>
        <div className="itemList">
            {
                dataList.map((item, index) => (
                    <div key={index} className={styles.itemContainer}>
                        <h2>{makeCapitalise(item.key)}</h2>
                        <div>{fetchValue(item.value)}</div>
                        <div className={styles.borderLine}></div>
                    </div>
                ))
            }
        </div>
    </div>
}

export default ItemList