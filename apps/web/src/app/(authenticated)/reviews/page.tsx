'use client'

import { useEffect, useState } from 'react'
import {
  Typography,
  Select,
  DatePicker,
  Button,
  List,
  Input,
  Row,
  Col,
  Spin,
} from 'antd'
import { EditOutlined, SendOutlined, CheckOutlined } from '@ant-design/icons'
const { Title, Text, Paragraph } = Typography
const { RangePicker } = DatePicker
const { Option } = Select
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function ReviewsPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()

  const [businessAccounts, setBusinessAccounts] = useState<
    Model.BusinessAccount[]
  >([])
  const [locations, setLocations] = useState<Model.Location[]>([])
  const [selectedBusinessAccount, setSelectedBusinessAccount] = useState<
    string | undefined
  >(undefined)
  const [selectedLocation, setSelectedLocation] = useState<string | undefined>(
    undefined,
  )
  const [reviews, setReviews] = useState<Model.Review[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs] | null>(
    null,
  )
  const [aiReplies, setAiReplies] = useState<{ [key: string]: string }>({})
  const [editingReply, setEditingReply] = useState<{ [key: string]: boolean }>(
    {},
  )

  useEffect(() => {
    if (userId) {
      Api.BusinessAccount.findManyByUserId(userId, { includes: ['locations'] })
        .then(setBusinessAccounts)
        .catch(() =>
          enqueueSnackbar('Failed to fetch business accounts', {
            variant: 'error',
          }),
        )
    }
  }, [userId])

  useEffect(() => {
    if (selectedBusinessAccount) {
      const account = businessAccounts.find(
        account => account.id === selectedBusinessAccount,
      )
      if (account?.locations) {
        setLocations(account.locations)
      }
    }
  }, [selectedBusinessAccount, businessAccounts])

  const fetchReviews = () => {
    if (selectedLocation && dateRange) {
      setLoading(true)
      Api.Review.findManyByLocationId(selectedLocation, {
        includes: ['replys'],
      })
        .then(reviews => {
          const filteredReviews = reviews.filter(review => {
            const reviewDate = dayjs(review.reviewDate)
            return (
              reviewDate.isAfter(dateRange[0]) &&
              reviewDate.isBefore(dateRange[1])
            )
          })
          setReviews(filteredReviews)
        })
        .catch(() =>
          enqueueSnackbar('Failed to fetch reviews', { variant: 'error' }),
        )
        .finally(() => setLoading(false))
    }
  }

  const generateAiReply = async (reviewId: string, reviewText: string) => {
    try {
      const prompt = `Generate a reply for the following review: "${reviewText}"`
      const reply = await Api.Ai.chat(prompt)
      setAiReplies(prev => ({ ...prev, [reviewId]: reply }))
      enqueueSnackbar('AI reply generated', { variant: 'success' })
    } catch {
      enqueueSnackbar('Failed to generate AI reply', { variant: 'error' })
    }
  }

  const publishReply = async (reviewId: string) => {
    const replyText = aiReplies[reviewId]
    if (!replyText) return

    try {
      await Api.Reply.createOneByReviewId(reviewId, {
        replyText,
        publishedDate: new Date().toISOString(),
        isAiGenerated: true,
      })
      enqueueSnackbar('Reply published', { variant: 'success' })
      fetchReviews()
    } catch {
      enqueueSnackbar('Failed to publish reply', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="narrow">
      <Title>Manage Reviews</Title>
      <Paragraph>
        Select a business account and location to manage reviews for specific
        locations.
      </Paragraph>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Select
            placeholder="Select Business Account"
            style={{ width: '100%' }}
            onChange={setSelectedBusinessAccount}
          >
            {businessAccounts?.map(account => (
              <Option key={account.id} value={account.id}>
                {account.googleAccountId}
              </Option>
            ))}
          </Select>
        </Col>
        <Col span={24}>
          <Select
            placeholder="Select Location"
            style={{ width: '100%' }}
            onChange={setSelectedLocation}
            disabled={!selectedBusinessAccount}
          >
            {locations?.map(location => (
              <Option key={location.id} value={location.id}>
                {location.name}
              </Option>
            ))}
          </Select>
        </Col>
        <Col span={24}>
          <RangePicker
            style={{ width: '100%' }}
            onChange={dates =>
              setDateRange(dates as [dayjs.Dayjs, dayjs.Dayjs])
            }
          />
        </Col>
        <Col span={24}>
          <Button
            type="primary"
            onClick={fetchReviews}
            disabled={!selectedLocation || !dateRange}
          >
            Fetch Reviews
          </Button>
        </Col>
      </Row>
      {loading ? (
        <Spin style={{ display: 'block', margin: '20px auto' }} />
      ) : (
        <List
          itemLayout="vertical"
          dataSource={reviews}
          renderItem={review => (
            <List.Item key={review.id}>
              <List.Item.Meta
                title={dayjs(review.reviewDate).format('MMMM D, YYYY')}
                description={review.reviewText}
              />
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Input.TextArea
                    value={aiReplies[review.id] || ''}
                    onChange={e =>
                      setAiReplies(prev => ({
                        ...prev,
                        [review.id]: e.target.value,
                      }))
                    }
                    disabled={!editingReply[review.id]}
                    rows={4}
                  />
                </Col>
                <Col span={24}>
                  <Button
                    icon={<EditOutlined />}
                    onClick={() =>
                      setEditingReply(prev => ({
                        ...prev,
                        [review.id]: !prev[review.id],
                      }))
                    }
                  >
                    {editingReply[review.id] ? 'Save' : 'Edit'}
                  </Button>
                  <Button
                    type="primary"
                    icon={<SendOutlined />}
                    onClick={() =>
                      generateAiReply(review.id, review.reviewText)
                    }
                    disabled={editingReply[review.id]}
                  >
                    Generate AI Reply
                  </Button>
                  <Button
                    type="primary"
                    icon={<CheckOutlined />}
                    onClick={() => publishReply(review.id)}
                    disabled={!aiReplies[review.id]}
                  >
                    Publish Reply
                  </Button>
                </Col>
              </Row>
            </List.Item>
          )}
        />
      )}
    </PageLayout>
  )
}
