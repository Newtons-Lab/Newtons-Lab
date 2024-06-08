'use client'

import { useState, useEffect } from 'react'
import { Typography, Input, Button, Form, Row, Col } from 'antd'
import { SaveOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
const { TextArea } = Input
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function SettingsPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [promptText, setPromptText] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (userId) {
      Api.User.findOne(userId, { includes: ['aiPrompts'] })
        .then(user => {
          if (user.aiPrompts && user.aiPrompts.length > 0) {
            setPromptText(user.aiPrompts[0].promptText)
          }
        })
        .catch(error => {
          enqueueSnackbar('Failed to fetch user data', { variant: 'error' })
        })
    }
  }, [userId])

  const handleSave = async () => {
    if (!userId) return

    setLoading(true)
    try {
      const values = { promptText }
      if (promptText) {
        await Api.AiPrompt.createOneByUserId(userId, values)
        enqueueSnackbar('Prompt saved successfully', { variant: 'success' })
      } else {
        enqueueSnackbar('Prompt cannot be empty', { variant: 'error' })
      }
    } catch (error) {
      enqueueSnackbar('Failed to save prompt', { variant: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageLayout layout="narrow">
      <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
        <Col span={24} style={{ textAlign: 'center' }}>
          <Title level={2}>AI Reply Tone Settings</Title>
          <Text>Set the tone for AI replies by providing a prompt below:</Text>
          <Form
            layout="vertical"
            onFinish={handleSave}
            style={{ marginTop: 20 }}
          >
            <Form.Item label="AI Prompt">
              <TextArea
                rows={4}
                value={promptText}
                onChange={e => setPromptText(e.target.value)}
                placeholder="Enter your prompt here..."
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                icon={<SaveOutlined />}
                loading={loading}
              >
                Save
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </PageLayout>
  )
}
