'use client'

import { useEffect, useState } from 'react'
import { Button, Form, Input, Typography, Row, Col, Spin } from 'antd'
import { GoogleOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function IntegrationPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()

  const [loading, setLoading] = useState(false)
  const [businessAccounts, setBusinessAccounts] = useState<
    Model.BusinessAccount[]
  >([])

  useEffect(() => {
    if (userId) {
      setLoading(true)
      Api.BusinessAccount.findManyByUserId(userId, { includes: ['user'] })
        .then(accounts => setBusinessAccounts(accounts))
        .catch(error =>
          enqueueSnackbar('Failed to fetch business accounts', {
            variant: 'error',
          }),
        )
        .finally(() => setLoading(false))
    }
  }, [userId])

  const handleOAuthIntegration = async () => {
    // Placeholder for OAuth integration logic
    // This should be replaced with actual OAuth flow implementation
    enqueueSnackbar('OAuth integration is not implemented yet', {
      variant: 'info',
    })
  }

  const handleFormSubmit = async (values: {
    googleAccountId: string
    accessToken: string
    refreshToken: string
  }) => {
    if (!userId) return

    setLoading(true)
    try {
      await Api.BusinessAccount.createOneByUserId(userId, values)
      enqueueSnackbar('Business account integrated successfully', {
        variant: 'success',
      })
      router.push('/reviews')
    } catch (error) {
      enqueueSnackbar('Failed to integrate business account', {
        variant: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageLayout layout="narrow">
      <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
        <Col span={24} style={{ textAlign: 'center' }}>
          <Title level={2}>Integrate Your Google Business Account</Title>
          <Text>
            Grant access via OAuth 2.0 to fetch reviews and publish replies.
          </Text>
        </Col>
        <Col span={24} style={{ textAlign: 'center', marginTop: 20 }}>
          <Button
            type="primary"
            icon={<GoogleOutlined />}
            onClick={handleOAuthIntegration}
          >
            Integrate with Google
          </Button>
        </Col>
        <Col span={24} style={{ marginTop: 40 }}>
          <Form layout="vertical" onFinish={handleFormSubmit}>
            <Form.Item
              label="Google Account ID"
              name="googleAccountId"
              rules={[
                {
                  required: true,
                  message: 'Please input your Google Account ID!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Access Token"
              name="accessToken"
              rules={[
                { required: true, message: 'Please input your Access Token!' },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Refresh Token"
              name="refreshToken"
              rules={[
                { required: true, message: 'Please input your Refresh Token!' },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
        {loading && (
          <Col span={24} style={{ textAlign: 'center', marginTop: 20 }}>
            <Spin />
          </Col>
        )}
      </Row>
    </PageLayout>
  )
}
