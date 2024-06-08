'use client'

import { useEffect, useState } from 'react'
import { Typography, Row, Col, Card, Spin } from 'antd'
import {
  StarOutlined,
  MessageOutlined,
  CommentOutlined,
} from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function HomePage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()

  const [loading, setLoading] = useState(true)
  const [overallStars, setOverallStars] = useState(0)
  const [overallReviews, setOverallReviews] = useState(0)
  const [overallReplies, setOverallReplies] = useState(0)

  useEffect(() => {
    if (!userId) return

    const fetchData = async () => {
      try {
        const businessAccounts = await Api.BusinessAccount.findManyByUserId(
          userId,
          {
            includes: [
              'locations',
              'locations.reviews',
              'locations.reviews.replys',
            ],
          },
        )
        let stars = 0
        let reviews = 0
        let replies = 0

        businessAccounts.forEach(account => {
          account.locations?.forEach(location => {
            location.reviews?.forEach(review => {
              stars += 1 // Assuming each review is a star
              reviews += 1
              replies += review.replys?.length || 0
            })
          })
        })

        setOverallStars(stars)
        setOverallReviews(reviews)
        setOverallReplies(replies)
      } catch (error) {
        enqueueSnackbar('Failed to fetch data', { variant: 'error' })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [userId])

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Dashboard</Title>
      <Text>Summary of your business performance</Text>
      {loading ? (
        <Spin size="large" />
      ) : (
        <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
          <Col xs={24} sm={12} md={8}>
            <Card>
              <StarOutlined style={{ fontSize: '24px', color: '#fadb14' }} />
              <Title level={4}>{overallStars}</Title>
              <Text>Overall Stars</Text>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card>
              <MessageOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
              <Title level={4}>{overallReviews}</Title>
              <Text>Overall Reviews</Text>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card>
              <CommentOutlined style={{ fontSize: '24px', color: '#52c41a' }} />
              <Title level={4}>{overallReplies}</Title>
              <Text>Overall Replies</Text>
            </Card>
          </Col>
        </Row>
      )}
    </PageLayout>
  )
}
