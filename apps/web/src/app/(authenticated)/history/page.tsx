'use client'

import { useEffect, useState } from 'react'
import { Table, Button, Typography, Space } from 'antd'
import { DownloadOutlined } from '@ant-design/icons'
const { Title, Text, Paragraph } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function HistoryPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()

  const [historyData, setHistoryData] = useState<Model.History[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const historysFound = await Api.History.findMany({
          includes: ['review', 'reply'],
        })
        setHistoryData(historysFound)
      } catch (error) {
        enqueueSnackbar('Failed to fetch history data', { variant: 'error' })
      } finally {
        setLoading(false)
      }
    }

    fetchHistory()
  }, [userId])

  const exportToCSV = () => {
    const headers = [
      'Review Text',
      'Reply Text',
      'Is AI Generated',
      'Review Date',
      'Reply Date',
    ]
    const rows = historyData.map(history => [
      history.review?.reviewText,
      history.reply?.replyText,
      history.reply?.isAiGenerated ? 'Yes' : 'No',
      dayjs(history.review?.reviewDate).format('YYYY-MM-DD'),
      dayjs(history.reply?.publishedDate).format('YYYY-MM-DD'),
    ])

    let csvContent =
      'data:text/csv;charset=utf-8,' +
      headers.join(',') +
      '\n' +
      rows.map(e => e.join(',')).join('\n')

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', 'history_export.csv')
    document.body.appendChild(link)
    link.click()
  }

  const columns = [
    {
      title: 'Review Text',
      dataIndex: ['review', 'reviewText'],
      key: 'reviewText',
    },
    {
      title: 'Reply Text',
      dataIndex: ['reply', 'replyText'],
      key: 'replyText',
    },
    {
      title: 'Is AI Generated',
      dataIndex: ['reply', 'isAiGenerated'],
      key: 'isAiGenerated',
      render: (isAiGenerated: boolean) => (isAiGenerated ? 'Yes' : 'No'),
    },
    {
      title: 'Review Date',
      dataIndex: ['review', 'reviewDate'],
      key: 'reviewDate',
      render: (reviewDate: string) => dayjs(reviewDate).format('YYYY-MM-DD'),
    },
    {
      title: 'Reply Date',
      dataIndex: ['reply', 'publishedDate'],
      key: 'publishedDate',
      render: (publishedDate: string) =>
        dayjs(publishedDate).format('YYYY-MM-DD'),
    },
  ]

  return (
    <PageLayout layout="narrow">
      <Title level={2}>History of Reviews and AI-generated Replies</Title>
      <Paragraph>
        As a user, you can see the history of reviews and AI-generated replies
        published so that you can keep track of past interactions. You can also
        export the history to a CSV file for external analysis.
      </Paragraph>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Button
          type="primary"
          icon={<DownloadOutlined />}
          onClick={exportToCSV}
        >
          Export to CSV
        </Button>
        <Table
          columns={columns}
          dataSource={historyData}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 10 }}
        />
      </Space>
    </PageLayout>
  )
}
